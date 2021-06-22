import Api from "../services/api";

interface IClient {
    id: number;
    trading_name: string;
    company_name: string;
    ein: string;
    state_registration: string;
}

export const Update = (client: IClient): void => {
    const api = Api();
    api.put(`/clients/${client.id}`, client).then(response => {

    }).catch(err => {

    });
}

export default IClient;