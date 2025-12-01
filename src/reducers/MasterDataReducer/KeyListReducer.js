import { CREATE_KEY_LIST, GET_KEY_LIST, UPDATE_KEY_LIST, DELETE_KEY_LIST } from "../../actions/types";



const initialState = {
    keyl: [
        // {Key_Name:'FPL1',Description:'Decantation in Tank 1',Color:'Green',Position:'D1-S1-P1',Created_At:'08-04-2022 12:53',Door:'1',Strip:'1',Slot:'1'},
        // {Key_Name:'FPL2',Description:'Decantation in Tank 2',Color:'Green',Position:'D1-S1-P2',Created_At:'08-04-2022 12:56',Door:'1',Strip:'1',Slot:'1'},
        // {Key_Name:'FPL3',Description:'Decantation in Tank 3',Color:'Green',Position:'D1-S1-P3',Created_At:'08-04-2022 13:02',Door:'1',Strip:'1',Slot:'1'},
        // {Key_Name:'FPL4',Description:'Decantation in Tank 4',Color:'Green',Position:'D1-S1-P4',Created_At:'08-04-2022 13:07',Door:'1',Strip:'1',Slot:'1'},
        // {Key_Name:'PDL',Description:'Common Padlock key for fill pipe',Color:'Green',Position:'D1-S1-P5',Created_At:'08-04-2022 13:10',Door:'1',Strip:'1',Slot:'1'},
        // {Key_Name:'DUEP1',Description:'Dispenser 1 Electronic Panel Preventive or Breakdown Maintenance',Color:'Green',Position:'D1-S1-P6',Created_At:'08-04-2022 13:13',Door:'1',Strip:'1',Slot:'1'},
        // {Key_Name:'DUEP2',Description:'Dispenser 2 Electronic Panel Preventive or Breakdown Maintenance',Color:'Green',Position:'D1-S1-P7',Created_At:'08-04-2022 13:15',Door:'1',Strip:'1',Slot:'1'},
        // {Key_Name:'DUHP1',Description:'Dispenser 1 Hydraulic Panel Preventive/Breakdown Maintenance',Color:'Green',Position:'D1-S1-P8',Created_At:'08-04-2022 13:17',Door:'1',Strip:'1',Slot:'1'},
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_KEY_LIST:
            return {
                ...state,
                keyl: action.payload,
            };

        case CREATE_KEY_LIST:
            return {
                ...state,
                keyl: [action.payload, ...state.keyl],
            };


        case UPDATE_KEY_LIST:
            return {
                ...state,
                keyl: state.keyl.map((keyl) =>
                    keyl.id == action.payload.id ? action.payload : keyl
                ),
            };
        case DELETE_KEY_LIST:
            return {
                ...state,
                keyl: state.keyl.filter(
                    (keyl) => keyl.id != action.payload.id
                ),
            };

        default:
            return state;
    }
}