import { useEffect, useState } from 'react'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ptBR from 'date-fns/locale/pt-BR'

import { searchDrivers, searchCustomers, createDriverSchedule } from '../services/apiService'
import MyCombobox from './form/MyComboBox'

import ScheduleTable from './ScheduleTable'

registerLocale('pt-BR', ptBR)
setDefaultLocale('pt-BR')

function ScheduleForm() {
    const [drivers, setDrivers] = useState([])
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        date: '',
        customer_id: '',
        driver_id: '',
        sort: 1
    })

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const data = await searchDrivers('')
                const formattedDrivers = data.data.map((item) => ({
                    id: item.id,
                    name: `${item.firstname} ${item.lastname}`
                }))
                setDrivers(formattedDrivers)
            } catch (error) {
                console.error('Error fetching drivers:', error)
            }
        }

        const fetchCustomers = async () => {
            try {
                const data = await searchCustomers('')
                const formattedCustomers = data.data.map((item) => ({
                    id: item.id,
                    name: `${item.firstname} ${item.lastname}`
                }))
                setCustomers(formattedCustomers)
            } catch (error) {
                console.error('Error fetching customers:', error)
            }
        }

        fetchDrivers()
        fetchCustomers()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            createDriverSchedule(formData)
                .then((response) => {
                    console.log(response)
                    setFormData({
                        date: '',
                        customer_id: '',
                        driver_id: '',
                        sort: 1
                    })
                })
                .catch((error) => {
                    console.error('Error submitting form:', error)
                })
                .finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <>
            <div className="mb-6">
                <h1>Incluídos</h1>
                <ScheduleTable />
            </div>

            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="date">
                            Data:
                        </label>
                        <DatePicker
                            selected={formData.date}
                            onChange={(date) => setFormData({ ...formData, date })}
                            dateFormat="dd/MM/yyyy"
                            locale="pt-BR"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="date"
                            type="text"
                            placeholder="date"
                            autocomplete="off"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="customers">
                            Cliente
                        </label>
                        <MyCombobox
                            id="customer"
                            items={customers}
                            selectedItemId={formData.customer_id}
                            onChange={(customerId) => handleChange('customer_id', customerId)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="drivers">
                            Motorista
                        </label>
                        <MyCombobox
                            id="driver"
                            items={drivers}
                            selectedItemId={formData.driver_id}
                            onChange={(driverId) => handleChange('driver_id', driverId)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Incluir rota'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ScheduleForm
