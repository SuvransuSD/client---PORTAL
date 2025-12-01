import { CREATE_AMS_CABINET, DELETE_AMS_CABINET, GET_AMS_CABINET, UPDATE_AMS_CABINET, } from "../../actions/types";



const initialState = {
    cabinet: [
        // {RO_Code: 'MHF189',Location:'Navada',State:'Maharashtra',Zone:'WEST',Gateway:'10.227.91.1',Ip_Address:'10.227.91.1',Subnet_Mask:'255.255.255.192'},
        // {RO_Code: 'MHF451',Location:'Bhopal Bypass',State:'Madhya Pradesh',Zone:'WEST',Gateway:'10.227.86.1',Ip_Address:'10.227.86.15',Subnet_Mask:'255.255.255.192'},
        // {RO_Code: 'MPF111',Location:'Hata',State:'Uttar Pradesh',Zone:'NORTH',Gateway:'10.227.85.1',Ip_Address:'10.227.85.15',Subnet_Mask:'255.255.255.192'},
        // {RO_Code: 'MPF116',Location:'Vinchur',State:'Maharashtra',Zone:'WEST',Gateway:'10.227.96.1',Ip_Address:'10.227.96.15',Subnet_Mask:'255.255.255.192'},
        // {RO_Code: 'JHF112',Location:'Vizag',State:'Andhra Pradesh',Zone:'SOUTH',Gateway:'10.227.95.1',Ip_Address:'10.227.95.15',Subnet_Mask:'255.255.255.192'},
        // {RO_Code: 'KRL117',Location:'Kanpur',State:'Uttar Pradesh',Zone:'NORTH',Gateway:'10.227.94.1',Ip_Address:'10.227.94.15',Subnet_Mask:'255.255.255.192'},
        // {RO_Code: 'UPF212',Location:'Noida',State:'Uttar Pradesh',Zone:'NORTH',Gateway:'10.227.93.1',Ip_Address:'10.227.93.15',Subnet_Mask:'255.255.255.192'},
        // {RO_Code: 'BHF317',Location:'Patna',State:'Bihar',Zone:'NORTH',Gateway:'10.227.92.1',Ip_Address:'10.227.92.15',Subnet_Mask:'255.255.255.192'},
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_AMS_CABINET:
            return {
                ...state,
                cabinet: action.payload,
            };

        case CREATE_AMS_CABINET:
            return {
                ...state,
                cabinet: [action.payload, ...state.cabinet],
            };


        case UPDATE_AMS_CABINET:
            return {
                ...state,
                cabinet: state.cabinet.map((cabinet) =>
                    cabinet.id == action.payload.id ? action.payload : cabinet
                ),
            };

        case DELETE_AMS_CABINET:
            return {
                ...state,
                cabinet: state.cabinet.filter(
                    (cabinet) => cabinet.id != action.payload.id
                ),
            };


        default:
            return state;
    }
}