import axios from 'axios'

export const iconAPI = {
    async getIcon(iconCode: string) {
        return axios.get(process.env.ICON_API_URL + `/${iconCode}.png`)
    }
}
