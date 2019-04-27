CB.Controllers.Checkout = {
    init() {
        ReactDOM.render(
            <CheckoutForm />,
            document.querySelector('[role=main]')
        );
    }
};

class CheckoutForm extends React.Component { // eslint-disable-line no-unused-vars
    componentWillMount() {
        this.store = CB.Controllers.CheckoutStore;
        this.store.reactComponent = this;

        this.store.stripePaymentIntent = JSON.parse($('#stripe-payment-intent').val());
        this.membershipCost = this.store.stripePaymentIntent.amount / 100;

        this._addEmptyParticipant();
    }

    render() {
        return (
            <form action="/purchase-confirmation" method="POST" id="checkout-form">
                <p>This is the final step of your registration. For each participant who is 13 years or older, please fill in the following information:</p>

                <ul className="styleless">
                    {this.store.participants.map((participant, i) => {
                        const reactKey = `${i}${participant.fullName}${participant.emailAddress}`; // We need to re-render whenever one of those values changes

                        return <ParticipantListItem key={reactKey} index={i} participant={participant} />;
                    })}
                </ul>

                <button type="button" id="add-participant-btn" className="styleless link" onClick={this._addEmptyParticipant.bind(this)}>Add one more</button>

                <div className="centered-contents">
                    <h3>Payment</h3>
                    <p>Membership is at {this.membershipCost} {this.store.getOrderCurrency()} (early bird price!)</p>
                    <div id="card-element" />
                    {this._submitButton()}
                    <ValidationError show={this.store.isPaymentFailed()} msg={this.store.paymentError} />
                </div>
            </form>
        );
    }

    componentDidMount() {
        this._initElements();
        this._initStripe();
    }

    _initElements() {
        this.$checkoutForm = $('#checkout-form');
    }

    _submitButton() {
        const innerHtml = this.store.isWaitingForStripe ? (<i className="fa fa-spinner fa-pulse fa-3x fa-fw" />) : `Pay ${this.store.getOrderAmount()} ${this.store.getOrderCurrency()}`;

        return (
            <button type="button" id="card-button" className="styleless" data-secret={this.store.getClientSecret()} onClick={this._handleCardButtonClick.bind(this)}>{innerHtml}</button>
        );
    }

    _initStripe() {
        this.stripe = Stripe('pk_test_sa1UVPtXHz4aZsYc99Un4TIE', { betas: ['payment_intent_beta_3'] });
        this.stripeCardElement = this.stripe.elements().create('card');
        this.stripeCardElement.mount('#card-element');
    }

    _addEmptyParticipant() {
        if (this.store.areParticipantsValid()) {
            this.store.addEmptyParticipant();
        }
    }

    _handleCardButtonClick() {
        this.store.clearPaymentError();

        if (!this.store.areParticipantsValid() || this.store.isWaitingForStripe) {
            return;
        }

        this.store.isWaitingForStripe = true;
        this.forceUpdate();

        const cardholderName = this.store.participants[0].fullName;
        const cardholderEmail = this.store.participants[0].emailAddress;

        this.stripe.handleCardPayment(
            this.store.getClientSecret(), this.stripeCardElement, {
                source_data: {
                    owner: {
                        name: cardholderName,
                        email: cardholderEmail
                    }
                },
                receipt_email: cardholderEmail
            }
        ).then(response => {
            if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
                this.$checkoutForm.submit();
            } else {
                const errorMessage = response.error ? response.error.message : 'Unknown payment error';

                this.store.setPaymentError(errorMessage);
            }
        }).catch(error => {
            this.store.setPaymentError(error.message);
        });
    }
}
