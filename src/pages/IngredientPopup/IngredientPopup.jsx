import Modal from "../../components/Modal/Modal";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
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