import Api from "../services/api";

interface IClient {
    id: number;
    trading_name: string;
    company_name: string;
    ein: string;
    state_registration: string;
}

export const Update = (client: IClient): Promise<any> => {
    const api = Api();
    return api.put(`/clients/${client.id}`, client);
}

export default IClient;