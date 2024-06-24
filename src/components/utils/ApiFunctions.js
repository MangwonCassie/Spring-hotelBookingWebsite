import axios from "axios"


//axios config 
// backendbaseURL 변수에 import.meta.env.VITE_BACKEND_URL 값 확인.
// const backendbaseURL = import.meta.env.VITE_BACKEND_URL;
const backendbaseURL = "http://localhost:9192";
console.log("Backend Base URL:", backendbaseURL);

export const api = axios.create({
	baseURL: backendbaseURL, //baseUrl 키 fix
	headers: { "Access-Control-Allow-Origin": "*" },
	withCredentials: true, // withCredentials를 추가하여 전역으로 설정합니다.
})



export const getHeader = () => {
	const token = localStorage.getItem("token")
	console.log("Token:", token) // Add this line to log the token
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`

	}
}

export const getHeaderFormData = () => {
	const token = localStorage.getItem("token");
	console.log("Token:", token); // Add this line to log the token
	return {
		Authorization: `Bearer ${token}`
	};
}

/* This function adds a new room room to the database */
export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("roomType", roomType)
	formData.append("roomPrice", roomPrice)

	const headers = getHeaderFormData();
	console.log("Headers:", headers); // 헤더 로그 찍기

	const response = await api.post(import.meta.env.VITE_BACKEND_URL + "rooms/add/new-room", formData, {
		headers: getHeaderFormData()
	})
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}



/* This function gets all room types from thee database */
export async function getRoomTypes() {
	try {
		const response = await api.get(import.meta.env.VITE_BACKEND_URL + "rooms/room/types")
		return response.data
	} catch (error) {
		throw new Error("Error fetching room types")
	}
}
/* This function gets all rooms from the database */
export async function getAllRooms() {
	try {
		const result = await api.get(import.meta.env.VITE_BACKEND_URL + "rooms/all-rooms")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(import.meta.env.VITE_BACKEND_URL + `api/rooms/delete/room/${roomId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}
/* This function update a room */
export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
	const response = await api.put(`/api/rooms/update/${roomId}`, formData, {
		headers: getHeader()
	})
	return response
}

/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
	try {
		const result = await api.get(import.meta.env.VITE_BACKEND_URL + `rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(import.meta.env.VITE_BACKEND_URL + `bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}

/* This function gets alll bokings from the database */
export async function getAllBookings() {
	try {
		const result = await api.get(import.meta.env.VITE_BACKEND_URL + "bookings/all-bookings", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(import.meta.env.VITE_BACKEND_URL + `bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(import.meta.env.VITE_BACKEND_URL + `bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}

/* This function gets all availavle rooms from the database with a given date and a room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
	const result = await api.get(
		`rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
	)
	return result
}

/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post(import.meta.env.VITE_BACKEND_URL + "auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post(import.meta.env.VITE_BACKEND_URL + "auth/login", login)
		console.log("auth/login:" + import.meta.env.VITE_BACKEND_URL + "auth/login");
		console.log("response:" + response);
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(import.meta.env.VITE_BACKEND_URL + `users/${userId}`, {
			headers: getHeaderFormData()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(import.meta.env.VITE_BACKEND_URL + `users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data;
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(import.meta.env.VITE_BACKEND_URL + `users/${userId}`, {
			headers:
				getHeader()
		})
		return response.data;
	} catch (error) {
		throw error
	}
}

// /* This is the function to get user bookings by the user id */ 헤더과하게 설정 일단 보류
// export async function getBookingsByUserId(userId, token) {
// 	try {
// 		// 요청 전에 헤더 확인
// 		const headers = {
// 			...getHeader(),
// 			Authorization: `Bearer ${token}`
// 		};
// 		console.log("Request headers:", headers);

// 		// 요청 보내기
// 		const response = await api.get(import.meta.env.VITE_BACKEND_URL + `bookings/user/${userId}/bookings`, {
// 			headers:
// 				headers
// 		})
// 		return response.data;
// 	} catch (error) {
// 		console.error("Error fetching bookings:", error.message)
// 		throw new Error("Failed to fetch bookings")
// 	}
// }

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}