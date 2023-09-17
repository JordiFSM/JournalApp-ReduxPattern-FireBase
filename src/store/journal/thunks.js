import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, noteUpdated, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNotes, setSaving } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );
        const { uid } =  getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) );
        const resp = await setDoc( newDoc, newNote);

        newNote.id = newDoc.id;

        //! dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}

export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        if ( !uid ) throw new Error(' El UID del usuario no existe')

        const notes = await loadNotes( uid );
        dispatch(setNotes( notes ))
    }
}

export const startSaveNotes = () => {
    return async ( dispatch, getState) => {

        dispatch( setSaving() );
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch(noteUpdated( note ));
    }
}

export const startUploadingFiles = ( files ) => {
    return async ( dispatch ) => {
        dispatch( setSaving());
        
        const fileUploadPromisses = [];
        for (const file of files) {
            fileUploadPromisses.push( fileUpload( file ))
        }
        const photoUrls = await Promise.all( fileUploadPromisses);

        dispatch( setPhotosToActiveNotes( photoUrls ));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        
        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id) );
    }
}

