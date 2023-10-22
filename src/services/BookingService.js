import axios from "axios";

const BOOKING_API_BASE_URL = 'http://localhost:8080/booking'

 class BookingService{
    getBookings(accessToken) {
        return axios.get(`${BOOKING_API_BASE_URL}/getAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    
 }

 export default new BookingService()