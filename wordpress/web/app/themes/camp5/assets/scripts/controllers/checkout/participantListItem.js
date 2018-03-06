class ParticipantListItem extends React.Component { // eslint-disable-line no-unused-vars
    render() {
        const i = this.props.index;
        const p = this.props.participant;

        const nameFieldValue = this.state.fullName || p.fullName;
        const emailFieldValue = this.state.emailAddress || p.emailAddress;

        const isNameInvalid = this.state.isNameInvalid || p.validationErrors.isName;
        const isEmailInvalid = this.state.isEmailInvalid || p.validationErrors.isEmail;

        const nameFieldClasses = classNames({
            "form-control": true,
            invalid: isNameInvalid
        });

        const emailFieldClasses = classNames({
            "form-control": true,
            invalid: isEmailInvalid
        });

        return (
            <li>
                <div>
                    <div className="form-group">
                        <label htmlFor={`participants[${i}][name]`} className="required">Full name</label>
                        <input type="text" className={nameFieldClasses} id={`participants[${i}][name]`}
                               name={`participants[${i}][name]`} value={nameFieldValue}
                               onChange={this._handleNameChange.bind(this)}/>
                        <ValidationError show={false}
                                         msg={`Must be at least ${this.store.validation.fullNameMinLength} characters`}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`participants[${i}][email]`} className="required">E-mail</label>
                        <input type="email" className={emailFieldClasses} id={`participants[${i}][email]`}
                               name={`participants[${i}][email]`} value={emailFieldValue}
                               onChange={this._handleEmailChange.bind(this)}/>
                        <ValidationError show={false} msg="This e-mail address looks invalid"/>
                    </div>
                </div>

                <div className="remove-btn-wrapper">
                    <button type="button" className="styleless"
                            onClick={this._handleRemoveBtnClick.bind(this)}>✕</button>
                </div>
            </li>
        );
    }

    componentWillMount() {
        this.state = {};
        this.store = CB.Controllers.CheckoutStore;
    }

    _handleNameChange(e) {
        this.store.updateParticipantName(this.props.index, e.target.value);

        const updatedParticipant = this.store.participants[this.props.index];

        this.setState({
            fullName: updatedParticipant.fullName,
            isNameInvalid: updatedParticipant.validationErrors.isName
        });
    }

    _handleEmailChange(e) {
        this.store.updateParticipantEmail(this.props.index, e.target.value);

        const updatedParticipant = this.store.participants[this.props.index];

        this.setState({
            emailAddress: updatedParticipant.emailAddress,
            isEmailInvalid: updatedParticipant.validationErrors.isEmail
        });
    }

    _handleRemoveBtnClick() {
        this.store.removeParticipant(this.props.index);
    }
}
