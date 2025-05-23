import axios from "@/axios.js";

export default class UiService {
    static async getColors() {
        try {
            const { data: colors } = await axios.get('/api/colors');
            return colors;
        } catch (error) {
            throw error;
        }
    }
}
