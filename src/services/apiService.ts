import { BASE_URL } from "./config"

const token = "1|ttsrtZw75EqKYGfqKd3rqiYavKKZzcURL7NocbGs708b86d7";
export const searchDrivers = async (q: string) => {
  try {
    const response = await fetch(`${BASE_URL}/drivers?query=${q}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error: ${error}`)
    throw error
  }
}

export const searchCustomers = async (q: string) => {
  try {
    const response = await fetch(`${BASE_URL}/customers?query=${q}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error: ${error}`)
    throw error
  }
}

export const createDriverSchedule = async (data: any) => {
  console.log(data)
  try {
    const response = await fetch(`${BASE_URL}/drivers-schedulers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
        // Se a resposta não for bem-sucedida, lança um erro com a mensagem do servidor
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData; // Retorna os dados se a requisição for bem-sucedida

  } catch (error) {
    console.error(`Error: ${error}`)
    throw error
  }
}