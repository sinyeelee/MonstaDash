export const addEvent = (event) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        firestore.collection('events').doc(userId).update({
            events: firestore.FieldValue.arrayUnion({event:event.event, eventId:event.eventId, eventDate:event.targetDay})
        }).then(() => {
            dispatch({ type: 'ADD_EVENT', event });
        }).catch((err) => {
            dispatch({ type: 'ADD_EVENT_ERROR', err })
        })
    }
};  

export const deleteEvent = (id) => async (
    dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        const res = await firestore.collection('events').doc(userId).get();
        const previousEvents = res.data().events;
        const newEvents = previousEvents.filter(event => event.itemId !== id);
        await firestore.collection('events').doc(userId).update({
            events: newEvents
        })
    };  