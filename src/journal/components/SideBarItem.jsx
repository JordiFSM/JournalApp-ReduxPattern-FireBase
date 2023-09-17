
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'


export const SideBarItem = ({ note, imageUrls = [] }) => {


    const dispatch = useDispatch();

    const onClickNote = () => {
        const img = note.imageUrls;
        if (!!!img){
            return dispatch( setActiveNote({...note, imageUrls}))
        } 
        return dispatch( setActiveNote({...note, img}))
    }

    const newTitle = useMemo( () => {
        return note.title.length > 17
        ? note.title.substring(0,17) + '...'
        : note.title;
    }, [ note.title ] )

  return (
    <>
        <ListItem disablePadding>
            <ListItemButton onClick={ onClickNote }>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ note.body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    </>
  )
}
