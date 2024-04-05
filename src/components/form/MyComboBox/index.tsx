import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import './styles.css'

export default function MyCombobox({ items, selectedItemId, onChange }) {
    const [selected, setSelected] = useState(items[0])
    const [query, setQuery] = useState('')

    useEffect(() => {
        // Quando o selectedItemId mudar, atualize o estado selected
        if (selectedItemId) {
            const selectedItem = items.find((item) => item.id === selectedItemId)
            setSelected(selectedItem || null)
        } else {
            setSelected(null) // Se selectedItemId for null ou undefined, limpe a seleção
        }
    }, [selectedItemId, items])

    const filtereditems =
        query === ''
            ? items
            : items.filter((item) =>
                  item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
              )

    const handleItemSelection = (selectedItem) => {
        setSelected(selectedItem)
        onChange(selectedItem.id) // Chamada da função onChange passando o ID do item selecionado
    }

    return (
        <div className="combobox-container">
            <Combobox value={selected || ''} onChange={handleItemSelection}>
                <div className="combobox-wrapper">
                    <div className="input-container">
                        <Combobox.Input
                            className="input"
                            displayValue={(item) => item.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="button">
                            <ChevronUpDownIcon className="chevron-icon" aria-hidden="true" />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="options-container">
                            {filtereditems.length === 0 && query !== '' ? (
                                <div className="nothing-found">Nothing found.</div>
                            ) : (
                                filtereditems.map((item) => (
                                    <Combobox.Option
                                        key={item.id}
                                        className={({ active }) =>
                                            `option ${active ? 'option-selected' : 'option-not-selected'}`
                                        }
                                        value={item}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                                >
                                                    {item.name}
                                                </span>
                                                {selected ? (
                                                    <span className="check-icon">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}
