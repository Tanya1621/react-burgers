import Modal from "../../Modal/Modal";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import React from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";


export const IngredientPage = () => {

return (
    <div style={{textAlign: 'center'}}>
        <IngredientDetails/>
    </div>
   )
}