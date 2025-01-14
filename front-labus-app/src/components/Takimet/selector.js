import { createSelector } from 'reselect';


const selectTakimReducerContent = (state) => state.takimReducerContent;


export const selectEmployee = createSelector(
    [selectTakimReducerContent],
    (takimReducerContent) => takimReducerContent?.takim?.employee || {}
);


export const selectSpitali = createSelector(
    [selectEmployee],
    (employee) => employee.reparti?.spitali || {}
);


export const selectQyteti = createSelector(
    [selectSpitali],
    (spitali) => spitali.qyteti || {}
);