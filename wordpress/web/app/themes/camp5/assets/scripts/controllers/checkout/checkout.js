CB.Controllers.Checkout = {
    init() {
        ReactDOM.render(
            <CheckoutForm />,
            document.querySelector("[role=main]")
        );
    }
};

class CheckoutForm extends React.Component { // eslint-disable-line no-unused-vars
    componentWillMount() {
        this.store = CB.Controllers.CheckoutStore;
        this.store.reactComponent = this;

        this._addEmptyParticipant();
    }

    render() {
        return (
            <form action="/purchase-confirmation" method="POST" id="checkout-form" onSubmit={this._handleFormSubmit.bind(this)}>
                <p>This is the final step of your registration. For each participant who is 13 years or older, please fill in the following information:</p>

                <ul className={"styleless"}>
                    {this.store.participants.map((participant, i) => {
                        const reactKey = `${i}${participant.fullName}${participant.emailAddress}`; // We need to re-render whenever one of those values changes

                        return <ParticipantListItem key={reactKey} index={i} participant={participant} />;
                    })}
                </ul>

                <button type="button" id="add-participant-btn" className="styleless link" onClick={this._addEmptyParticipant.bind(this)}>Add one more</button>

                <div className="centered-contents">
                    <button id="pay-btn" className="styleless">Pay with Card</button>
                </div>

                <input type="hidden" id="stripe-token" name="stripe-token" />
                <input type="hidden" id="stripe-email" name="stripe-email" />
                <input type="hidden" id="stripe-amount" name="stripe-amount" />
            </form>
        );
    }

    componentDidMount() {
        this._initElements();
        this._initStripe();
    }

    _initElements() {
        this.$checkoutForm = $("#checkout-form");
        this.$participantDetailPanels = this.$checkoutForm.children("div");
        this.$addParticipantBtn = this.$checkoutForm.children("#add-participant-btn");
        this.$stripeScriptWrapper = this.$checkoutForm.children("#stripe-script-wrapper");
        this.$stripeTokenInput = this.$checkoutForm.children("#stripe-token");
        this.$stripeEmailInput = this.$checkoutForm.children("#stripe-email");
        this.$stripeAmountInput = this.$checkoutForm.children("#stripe-amount");
    }

    _initStripe() {
        this.stripeHandler = StripeCheckout.configure({ // eslint-disable-line no-undef
            key: "pk_live_BGrpxhPpHFq9duVYIcVQzXCC",
            image: "https://stripe.com/img/documentation/checkout/marketplace.png",
            locale: "auto",

            token: t => {
                this.$stripeTokenInput.val(t.id);
                this.$stripeEmailInput.val(t.email);
                this.$stripeAmountInput.val(this._paymentAmount());
            }
        });
    }

    _addEmptyParticipant() {
        if (this.store.areParticipantsValid()) {
            this.store.addEmptyParticipant();
        }
    }

    _handleFormSubmit(e) {
        e.preventDefault();

        if (this.store.areParticipantsValid()) {
            this.stripeHandler.open({
                name: "Camp5",
                description: "Membership 2018 - Regular",
                currency: "sek",
                amount: this._paymentAmount(),
                email: _.head(this.store.participants).emailAddress,

                closed: () => {
                    if (this._isCheckoutPopupSubmitted()) {
                        this.$checkoutForm.submit();
                    }
                }
            });
        }
    }

    _isCheckoutPopupSubmitted() {
        return this.$stripeTokenInput.val() && this.$stripeEmailInput.val() && this.$stripeAmountInput.val();
    }

    _paymentAmount() {
        return this.store.membershipPriceInOre * this.store.participants.length;
    }
}
