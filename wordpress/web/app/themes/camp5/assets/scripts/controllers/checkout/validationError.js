class ValidationError extends React.Component { // eslint-disable-line no-unused-vars
    render() {
        const {show, msg} = this.props;

        if (!show) {
            return null;
        }

        return <p className="validation-error">{msg}</p>;
    }
}
