import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

/*     static getDerivedStateFromError = (err) => {
        return {error: true}
    } */

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
// Предохранители не ловят ошибки в 
// обработчиках событий
// Асмнхронный код
// в самом предохранителе