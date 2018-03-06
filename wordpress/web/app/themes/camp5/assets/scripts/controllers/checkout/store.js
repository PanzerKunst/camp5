CB.Controllers.CheckoutStore = {
    reactComponent: null,
    validation: {
        fullNameMinLength: 3,
        emailRegExp: /^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/i
    },
    membershipPriceInOre: 50000,
    participants: [],

    addEmptyParticipant() {
        this.participants.push({
            fullName: "",
            emailAddress: "",
            validationErrors: {}
        });

        this.reactComponent.forceUpdate();
    },

    removeParticipant(index) {
        this.participants.splice(index, 1);
        this.reactComponent.forceUpdate();
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
