import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import france from '../../../assets/img/france.svg';


export default function SectionIdemSearch(props) {

    let tromper=0;
    let compteur=0;
    let i=0;
    let j=0;
    let nouveauMot = "";

    const [showFrench, setShowFrench] = useState(false)

    for(i=0;i<props.english.length;i++){
        tromper=0;
        compteur=0;
        if(props.english[i]===props.mot[0]){
            for(j=i;j<props.mot.length;j++){
                if(props.english[j]!==props.mot[compteur]){
                    tromper+=1;
                }
                compteur++;
            }

            if(tromper===0){
                i+=props.mot.length-1
                nouveauMot += "<span style='color:#1f3c88;background-color:rgba(158,202,236,0.3);padding:0.1%;border-radius:4px;'>";
                nouveauMot += props.mot
                nouveauMot +="</span>"
            }else{
                nouveauMot += props.english[i]
            }

        }else{
            nouveauMot += props.english[i]
        }

    }
  return (
    <li className="MuiListItem-container" style={{
        marginBottom:"1%"
    }}>
        <div class="MuiListItem-root MuiListItem-dense MuiListItem-gutters MuiListItem-secondaryAction"><div class="MuiListItemAvatar-root"><div
         class="MuiAvatar-root MuiAvatar-circle MuiAvatar-colorDefault">
        <Button onClick={()=>setShowFrench(!showFrench)} color="warning" style={{borderRadius: "100%"}}>
         <i className="material-icons" >touch_app</i> 
         </Button></div></div><div class="MuiListItemText-root MuiListItemText-dense MuiListItemText-multiline"><h4 className="font-normal" style={{
            width: "90vh",
            marginLeft: "3%",
            height: "3vh"
         }} ><div dangerouslySetInnerHTML={{ __html: nouveauMot }} /></h4>
         {showFrench && <div style={{marginLeft: "6%"}}><h5 className="font-normal"> <img src={france} alt=""  width="2%"/> {props.french}</h5></div>}</div></div>
    </li>
)
}
