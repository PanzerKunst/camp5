CB.Controllers.CheckoutStore = {
    reactComponent: null,
    validation: {
        fullNameMinLength: 3,
        emailRegExp: /^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/i
    },
    participants: [],

    getClientSecret() {
        return this.stripePaymentIntent.client_secret;
    },

    getOrderAmount() {
        return this.stripePaymentIntent.amount / 100;
    },

    getOrderCurrency() {
        return this.stripePaymentIntent.currency.toUpperCase();
    },

    addEmptyParticipant() {
        this.participants.push({
            fullName: '',
            emailAddress: '',
            validationErrors: {}
        });

        this.reactComponent.forceUpdate();

        if (this.participants.length > 1) {
            this.isWaitingForStripe = true;
            this.reactComponent.forceUpdate();

            fetch('/wp-json/camp5/v1/update-stripe-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(json => {
                    this.stripePaymentIntent = json;
                    this.isWaitingForStripe = false;
                    this.reactComponent.forceUpdate();
                });
        }
    },

    removeParticipant(index) {
        this.participants.splice(index, 1);
        this.isWaitingForStripe = true;
        this.reactComponent.forceUpdate();

        fetch('/wp-json/camp5/v1/update-stripe-order', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                this.stripePaymentIntent = json;
                this.isWaitingForStripe = false;
                this.reactComponent.forceUpdate();
            });
    },

    updateParticipantName(i, fullName) {
        const p = this.participants[i];

        p.fullName = fullName;
        this._isParticipantValid(p);
    },

    updateParticipantEmail(i, emailAddress) {
        const p = this.participants[i];

        p.emailAddress = emailAddress;
        this._isParticipantValid(p);
    },

    areParticipantsValid() {
        let isValid = true;

        for (let i = 0; i < this.participants.length; i++) {
            if (!this._isParticipantValid(this.participants[i])) {
                isValid = false;
                break;
            }
        }

        this.reactComponent.forceUpdate();

        return isValid;
    },

    setPaymentError(message) {
        this.paymentError = message;
        this.isWaitingForStripe = false;
        this.reactComponent.forceUpdate();
    },

    clearPaymentError() {
        this.paymentError = undefined;
        this.reactComponent.forceUpdate();
    },

    isPaymentFailed() {
        return this.paymentError !== undefined;
    },

    _isParticipantNameValid(p) {
        return p.fullName.length >= this.validation.fullNameMinLength;
    },

    _isParticipantEmailValid(p) {
        return this.validation.emailRegExp.test(p.emailAddress);
    },

    _isParticipantValid(p) {
        let isValid = true;

        p.validationErrors = {};

        if (!this._isParticipantNameValid(p)) {
            isValid = false;
            p.validationErrors.isName = true;
        }

        if (!this._isParticipantEmailValid(p)) {
            isValid = false;
            p.validationErrors.isEmail = true;
        }

        return isValid;
    }
};
