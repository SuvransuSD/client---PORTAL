import { mainUrl } from "./model"

export const apis = {
    createActivity: `${mainUrl}/activityController/create`,
    getActivity: `${mainUrl}/activityController/list`,
    retrieveActivity: `${mainUrl}/activityController/retrieve`,
    updateActivity: `${mainUrl}/'activityController/update`,
    deleteActivity: `${mainUrl}/activityController/delete`
}