export class PaymentPreferencesDto{
    public customerId: string;
    public token: string;
    public cardType: string;
    public cardNumber: string;
    public paymentUser: string;
    public defaultCard: Boolean;

    /**
     * Constructor
     * @param customerId the id of the customer
     * @param token the token returned by transbank
     * @param cardType the type of the card
     * @param cardNumber the las four digits of the card
     * @param paymentUser the user associated to the payment
     * @param defaultCard true or false
     */

    constructor(customerId: string, token: string, cardType: string, cardNumber: string, paymentUser: string, defaultCard: Boolean) {
        this.customerId = customerId,
        this.token = token;
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.paymentUser = paymentUser;
        this.defaultCard = defaultCard;
    }
}