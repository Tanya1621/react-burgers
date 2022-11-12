import Modal from "../../Modal/Modal";
import IngredientDetails from "../../IngredientDetails/IngredientDetails";
import {useHistory} from "react-router-dom";

export const IngredientPopup = () => {
    const history = useHistory();
    function close () {
        history.goBack()
    }
    return (<Modal close={close}>
        <IngredientDetails />
    </Modal>
)
}