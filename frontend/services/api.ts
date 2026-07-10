import axios from "axios";

import { Ticket } from "@/types/ticket";

const api = axios.create({

    baseURL: "http://127.0.0.1:8000",

});

export async function submitTicket(
    form: FormData,
) {

    const response = await api.post(
        "/tickets",
        form,
    );

    return response.data;

}

export async function getTickets(): Promise<Ticket[]> {

    const response = await api.get<Ticket[]>(
        "/tickets",
    );

    return response.data;

}

export async function getTicket(
    id: number,
): Promise<Ticket> {

    const response = await api.get<Ticket>(
        `/tickets/${id}`,
    );

    return response.data;

}

export async function updateTicketStatus(
    id: number,
    status: string,
) {

    const response = await api.patch(

        `/tickets/${id}/status`,

        {

            status,

        },

    );

    return response.data;

}

export async function approveRecommendation(

    ticketId: number,

    contractorType: string,

) {

    const response = await api.patch(

        `/tickets/${ticketId}/approve`,

        {

            contractor_type: contractorType,

        },

    );

    return response.data;

}

export async function closeTicket(
    id: number,
) {

    const response = await api.patch(

        `/tickets/${id}/close`,

    );

    return response.data;

}

export async function importEmail(
    formData: FormData,
) {

    const response = await api.post(

        "/emails/import",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        },

    );

    return response.data;

}