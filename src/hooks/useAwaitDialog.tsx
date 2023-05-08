import { useDispatch } from "react-redux";
import useAwaitableComponent from "use-awaitable-component";
import { DIALOG_ACTIVE } from "../constants/actions";

const useAwaitDialog = () => {
    const [status, execute, resolve, reject, reset] = useAwaitableComponent();
    const dispatch = useDispatch()

    dispatch({ type: DIALOG_ACTIVE, awaitComponentData: { status, resolve, reject, reset } })

    return { execute, reset }
}

export default useAwaitDialog