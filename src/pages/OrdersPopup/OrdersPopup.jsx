import {useHistory} from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import {OrderInfo} from "../../components/OrderInfo/OrderInfo";
import {useEffect} from "react";


export const OrdersPopup = () => {
    const history = useHistory();
    const testObject = {
        createdAt: "2022-11-16T11:44:17.370Z",
        ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cc', '60d3b41abdacab0026a733c7'],
        name: "Spicy флюоресцентный бургер",
        number: 30302,
        status: "done",
        updatedAt: "2022-11-16T11:44:17.767Z",
        _id: "6374cd119b518a001bb845cd",
    }

    function close () {
        history.goBack()
    }
    return (<Modal close={close}>
            <OrderInfo order={testObject}/>
        </Modal>
    )
}