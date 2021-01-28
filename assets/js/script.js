const cookie_popup_dom =  ' <div class="cookie-popup-section">'
                        +       '<div class="cookie-popup-w">'
                        +           '<div class="description">'
                        +                'Brandcrush use cookies to ensure you get the best experience on our website. <a href="/termsofservice">Learn more here</a>.'
                        +           '</div>'
                        +           '<div class="button-w">'
                        +                '<div class="button is-dark" id="allow_cookie_btn">Got it!</div>'
                        +           '</div>'
                        +        '</div>'
                        +    '</div>';

const notification_popup_dom = 
                            '<section class="site-notification-section">'
                        +       '<div class="site-notification-w">'
                        +           '<div class="description">'
                        +               'Due to the Covid-19 isolation rules, many physical activation spaces are temporarily unavailable. Discover contactless and digital activation opportunities here.'
                        +           '</div>'
                        +           '<div class="button-w">'
                        +               '<a href="https://content.brandcrush.com/blog/contactless-digital-spaces">'
                        +                   '<div class="button is-dark" id="allow_notification">Discover</div>'
                        +               '</a>'
                        +           '</div>'
                        +       '</div>'
                        +   '</section>';

$(document).ready(function() {

    AOS.init({
        offset: 50,
        duration: 1500,
        once: true
    });
    
    if(!localStorage.getItem("brandcrush_cookie")){
        $("body").append(cookie_popup_dom);
        $("#allow_cookie_btn").click(function(){
            $(".cookie-popup-section").remove();
            localStorage.setItem("brandcrush_cookie", "true");
        });
    }
    /*if(!localStorage.getItem("brandcrush_notification")){
        $("body").prepend(notification_popup_dom);
        $("#allow_notification").click(function(){
            $(".site-notification-section").remove();
            localStorage.setItem("brandcrush_notification", "true");
        });
    }*/

    $('.auth-require-modal .close-btn').on('click', function(){
        $('.auth-require-modal').toggleClass( "is-active" );
    })
    $('.auth-require-modal .modal-background').on('click', function(){
        $('.auth-require-modal').toggleClass( "is-active" );
    })
    
});

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

function case_studies_init(){
    AOS.refresh();
    $('.casestudies-slider-w').slick({
        arrows: false,
        variableWidth: true,
    });
}

function navbar_init(){
    $(".navbar-burger").click(function() {  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        // $(".navbar-menu").toggleClass("is-active");  
        $('body').toggleClass('push-toright');
        $('.mobile_menu').toggleClass('pushright-open');

        
        //////toggle sub menu//////
        $('.menu-to-howitworks').click(function(e){
            e.preventDefault();
            $('.menu-level-main').css('display', 'none');
            $('.menu-level-howitworks').css('display', 'block');
        })
        $('.menu-to-activations').click(function(e){
            e.preventDefault();
            $('.menu-level-main').css('display', 'none');
            $('.menu-level-activations').css('display', 'block');
        })
        $('.menu-to-back').click(function(e){
            e.preventDefault();
            $('.menu-level-main').css('display', 'block');
            $(this.parentNode).css('display', 'none');
        })

    });
    $(".search-btn").click(function(){
        queryAction()
    })
    $(".search-query").on('keyup', function(e){
        if(e.keyCode == 13){
            queryAction()
        }
    })
}
function queryAction(){
	$('#video-bg').trigger('pause');
	
    var query = $(".search-query").val();
    var typeQuery = $(".custom-select select").val();
    window.open('https://brandcrush.com/brand/search?q=' + query + '&' + typeQuery, '_self');
    // if(selectValue == '0'){
    //     window.open('https://brandcrush.com/brand/search?q=' + query, '_self');
    // }
    // else{
    //     window.open('https://brandcrush.com/brand/search?q=' + query + '&activatedByIds=' + selectValue, '_self');
    // }
}

function subscription_init(){
    $('#subscribe_btn').on('click', function(){
        if($("#subscribe_email").val() === ''){
            toast({
                type: 'error',
                title: "Please insert email!"
            });
            return false;
        }
        var formData = {
                "fields":[
                    {
                        "name": "email",
                        "value": $("#subscribe_email").val()
                    }
                ]
            }
        $.ajax({
            type: 'post',
            url: 'https://api.hsforms.com/submissions/v3/integration/submit/4363226/b6acb0d6-24c1-4442-a7c5-7bfea7798f4a',
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (data) {
                toast({
                    type: 'success',
                    title: "Thanks your message has successfuly sent."
                });
                $("#subscribe_email").val("");
            },
            error: function (data) {
                toast({
                    type: 'error',
                    title: "failed to send your email!"
                });
            },
        });
    })
}

var generalArr = [
    {
        question: "What is Brandcrush?",
        answer: "Brandcrush is a brand activation and media partnerships platform. Through Brandcrush, brands and agencies can discover and scale brand experiences to engage hypertargeted audiences, while businesses can unlock and manage their owned media with a smart listing and booking solution. "
    },{
        question: "What's a Brand?",
        answer: "A Brand is any business with a product or message that they want to share with consumers."
    },{
        question: "What's an activation?",
        answer: "An activation is a brand experience that makes your brand known to people, increasing awareness and engagement."
    },{
        question: "What's an Activation Partner",
        answer: "An activation partner is any business who can leverage their existing customer reach to connect brands with consumers."
    },{
        question: "What's an activation space?",
        answer: "An activation space is a brand opportunity that offers either a physical or digital consumer reach. i.e a popup space, sponsorship, digital placement, gift sampling."
    },{
        question: "What is an experiential activation?",
        answer: "Experiential activations are where brands create live “sensory” experiences to connect with consumers in high traffic spaces i.e. The entrance to a store or at an event."
    },{
        question: "What is \"customer reach\"",
        answer: "Customer reach is the number of consumers that an activation partner can connect a brand with during an activation. For experiential media: it is how many customers you estimate will receive a sample or marketing message during an activation in your space or at your event. For digital and print media: it is the audience numbers or foot traffic that will see the brand’s message. It is important that businesses do not over-represent their customer reach as it will create logistical issues and a disappointing experience for the Brand."
    },{
        question: "Is Brandcrush in all countries?",
        answer: "Brandcrush is a global platform. Activations partners can sign up and list a space at any time and brands can search spaces by region."
    },{
        question: "How does Brandcrush make money?",
        answer: "Brandcrush is a SaaS enabled marketplace. We charge transaction fees and subscription fees to our Activation Partners for use of the platform and offer a range of subscription types from basic level with no sign-up fees, through to an enterprise level. "
    },{
        question: "Who executes the activation?",
        answer: "Brands can choose to activate with their brand teams or they can request activation partners to activate for them. Brands can search spaces by whether they will be activated by the brand or by the activation partner."
    },{
        question: "Who is responsible for activation merchandise & samples?",
        answer: "Brands and activation partners are both responsible. Brands must ensure product or merchandise arrives a minimum of three days prior to the activation dates (or as stated on the activation booking details) and activation partners must ensure that they receive, unpack, store and/or display products to the highest possible standards. Please refer to our terms & conditions for further information."
    },{
        question: "What happens if an Activation Partner doesn't distribute samples?",
        answer: "Brands are protected as Brandcrush only makes payment to an activation partner upon receipt of an activation report. In this situation, an alternative campaign date is generally rescheduled."
    },{
        question: "How does Brandcrush work with agencies? ",
        answer: "Brandcrush works closely with all PR, Activation and Media agencies, offering our platform as a workflow solution for their clients. We do not charge any platform fees to our brands and agencies. There is full transparency on our activation rates which are set by our Activation partners. We do offer concierge support to our agency clients."
    },{
        question: "How does Brandcrush monitor Activation Partners & customer reach estimates?",
        answer: "Brandcrush has rich insight into foot traffic and reach trends through the thousands of spaces listed on our platform. We track and compare customer reach by category to ensure all space listings fall within a validated threshold and review data additional data points."
    },{
        question: "How does Brandcrush ensure activations have been executed?",
        answer: "Brandcrush executes \"mystery shopper\" reporting across randomly selected activation partners as well as receiving \"photo proof\" for every activation. We work closely with our Activation Partners to deliver a successful activation."
    }
]

var brandArr=[
    {
        question: "How does Brandcrush ensure activations have been executed?",
        answer: "Brandcrush executes \"mystery shopper\" reporting across randomly selected activation partners as well as receiving \"photo proof\" for every activation. We work closely with our Activation Partners to deliver a successful activation."
    },{
        question: "What is a booth or popup activation?",
        answer: "Popup activations are a short term retail offering where a brand can sell product in a dedicated space. i.e a shoe brand selling at a gym or in a shopping mall."
    },{
        question: "What is D2C sampling?",
        answer: "Product samples and brand offers are added into online shopping deliveries and subscription boxes and delivered directly to consumers."
    },{
        question: "What is a bathroom activation?",
        answer: "Catch people at the right place and time by placing personal care, cosmetics or wellness products in bathrooms. This passive self-serve activation will invite customers to interact with your brand in an organic way when they will appreciate it most."
    },{
        question: "What is a countertop activation?",
        answer: "Create a passive display for brands on countertops, catching the eye of customers while they're ordering coffee or paying the bill. This display could include a sample of your product, brand messaging, a discount voucher, or any other incentive."
    },{
        question: "What is a decal/poster activation?",
        answer: "Brands can feature messages on decals and/or posters in a business space."
    },{
        question: "What is a digital screen activation?",
        answer: "Reach customers on their path to purchase with rich video content delivered via in-store display screens."
    },{
        question: "What is a digital sponsorship?",
        answer: "Brands are promoted via live streaming channels, email marketing and social media."
    },{
        question: "What is an event sponsorship?",
        answer: "Engage with event attendees by sponsoring an event. Event sponsorship details are specific to each event."
    },{
        question: "What is an on the menu activation?",
        answer: "Feature your food or beverage in special \"on the menu\" items in popular cafes, restaurants or meal kit delivery boxes. Suggest a recipe to showcase your item, or let r resident chef come up with something truly memorable on your behalf."
    },{
        question: "What is an on the trainer activation?",
        answer: "Popular fitness trainers become ambassadors for your brand by wearing your sports apparel or work-out accessories."
    },{
        question: "What is a goody bag activation?",
        answer: "Access engaged event attendees and have your product, message or voucher included in event goody bags. This is an easy, no-fuss activation which lets you leverage existing associations and join in with other brands on a group marketing effort."
    },{
        question: "What is a roaming activation?",
        answer: "Brands bring in their own roaming brand ambassadors to take product samples and messages to the people."
    },{
        question: "What is a takeover activation?",
        answer: "Brands bring in their own team and branding to take over a partner’s space (and socials) for a day — perfect for special occasions like PR events, parties and product launches."
    },{
        question: "What is a street space activation?",
        answer: "Connect with consumers passing by in high foot-traffic street spaces."
    },{
        question: "How do samples get distributed?",
        answer: "Once a booking request is approved, brands can download a CSV spreadsheet that includes a contact person, address, business name and volume of samples required per space. This CSV is then used by the brands' warehouse to distribute samples directly to the activation partner. Brandcrush can also provide a full delivery concierge service if needed. Select activation partners may send through a Purchase Order with delivery details."
    },{
        question: "What is the pricing structure for spaces?",
        answer: "Activation partners set their own pricing for their activation opportunities."
    },{
        question: "What if we are a service based business?",
        answer: "If you don’t have products to sample, why not distribute marketing materials or discount offers?  Anything that adds value for consumers and builds awareness for your business can be achieved via Brandcrush."
    },{
        question: "Can we book floor space for us to run our own activation?",
        answer: "Yes, simply use our search function to find spaces suitable for your activation. If you find a suitable space but need a specific space position (eg. floor), then you can message the activation partner directly with your request."
    },{
        question: "Can we brief promotional staff for an activation?",
        answer: "Yes, brands can upload product information, scripts and marketing collateral when they set up their booking request. This is used to educate activation partners and promotional staff on site."
    },{
        question: "Can we sample and sell product?",
        answer: "Yes, simply use our search functionality to find spaces that permit selling in their activation spaces."
    },{
        question: "What campaign reports are provided?",
        answer: "When an activation partner runs an activation for a brand, they are required to provide a report at the end of every activation. This report includes insights, feedback from consumers as well as photos of the activation."
    },{
        question: "How much does it cost to book an activation?",
        answer: "Our activation rates are set by our partners. There is full pricing transparency and partners can adjust their pricing. Rates are generally based on customer reach, so dependent on the reach the activation partner pricing will vary."
    },{
        question: "Can I pay on invoice?",
        answer: "Yes, you can request to pay via invoice on your profile page or accounts@brandcrush.com if you would like to request approval."
    },{
        question: "When are credit card payments processed?",
        answer: "Credit card payments are processed as soon as your activation request is accepted by an activation partner. You can find a summary of payments in your dashboard. Brandcrush holds the payment for a maximum of five days while your activation request is pending."
    },{
        question: "What is the Brandcrush service fee?",
        answer: "Brandcrush does not charge any service fees to brands and agencies. We monetize on the activation partners.. This means the rates you see are the rates that are set by our activation partners who use our platform to promote and manage their experiential and partnerships media."
    },{
        question: "Why was a credit card payment taken before my activation request was approved?",
        answer: "Brandcrush holds payment for a maximum of five days while your activation request is pending."
    },{
        question: "Are there any set up or subscription fees?",
        answer: "There are no sign up fees for Brands and Agencies. Brandcrush has subscription fees for our activation partners."
    },{
        question: "Is there a minimum spend?",
        answer: "There is no minimum spend. You can spend as much or as little as you like with Brandcrush. Most brands book a volume of spaces for a one or two week campaign"
    },{
        question: "Can we pay with product only?",
        answer: "Sometimes, yes. Use our search function to find product-in-kind opportunities on the platform."
    },{
        question: "When should I send merchandise for a campaign?",
        answer: "Samples and materials need to arrive at the activation space as started on your activation booking  or as advised by the activation partner, prior to your activation start date. Please include a copy of your Brandcrush booking confirmation with your product delivery for each space."
    },{
        question: "Why are my activation requests being declined?",
        answer: "Activation partners are looking to partner with like-minded brands who complement their existing business and delight their customers. Please contact concierge@brandcrush.com to help find suitable spaces."
    },{
        question: "When will I know if my activation request is approved or declined?",
        answer: "Activation partners are encouraged to respond within 24 hours. The space will be shown as booked until they respond. Any requests pending for five days or more will be automatically declined."
    },{
        question: "How does Brandcrush ensure activations have been executed?",
        answer: "Brandcrush executes \"mystery shopper\" reporting across randomly selected activation partners as well as receiving \"photo proof\" for every activation. The Brandcrush activation success team also works very closely with each of our partners to support them in delivering a successful activation."
    },{
        question: "Why do brands value experiential and sampling activations?",
        answer: "Research suggests that consumers are much more likely to buy a product after trying it."
    },{
        question: "How much of my budget should be allocated to activations?",
        answer: "Marketers are allocating up to 50% of their budget to experiential marketing."
    },{
        question: "Can I submit a booking request for multiple spaces at once?",
        answer: "Absolutely, you can build a national campaign in a few clicks. Simply add spaces using the campaign building, provide the booking details and submit your activation request."
    },{
        question: "Can I create a long term partnership with a space?",
        answer: "Brands can book out activation spaces for extended periods providing them with effective or limited exclusivity with an activation partner"
    },{
        question: "Can I cancel a booking after being accepted by an Activation Partner?",
        answer: "Cancellation requests made 30 days prior to an activation date will receive a 100% refund. Any cancellation request made less than 30 days before the activation start date will be refundable at 50% of the activation rate. Any cancellation request made in less than 15 days of an activation start date will be non-refundable. Brandcrush will still charge transaction fees on all cancellation fees. Some activation partners may include supplementary terms with different cancellation policies, note these terms will supersede our terms so always review them when placing a booking."
    },{
        question: "What happens to our product, samples and materials if we cancel an activation and items have already been delivered ?",
        answer: "Brands can arrange for pick up and return of product and materials at their own expense or message activation partners to arrange the activation for another booking date."
    },{
        question: "Can I negotiate pricing with an Activation Partner?",
        answer: "Activation Partners set prices based on what the marketplace is prepared to pay. You can negotiate for longer term bookings or use our in app messaging to contact the partner and negotiate. Brandcrush can also help concierge. For more information email concierge@brandcrush.com"
    }
]

var activationArr=[
    {
        question: "What brands use Brandcrush?",
        answer: "Brandcrush connects you with like-minded brands who are trying to reach your customers through high engagement activation opportunities."
    },{
        question: "What does it cost to list an activation space?",
        answer: "Nothing! It's 100% free to sign up and list a space on Brandcrush. Our Basic subscription offers a pay-per-booking model, whereas our Lite, Pro and Pro Plus plans offer advanced features and reduced transactional cost for a monthly fee."
    },{
        question: "How do I get paid?",
        answer: "Brandcrush pays all activation partners within 48 hours (or nearest business day) of receiving a completed activation report, or from the activation date if no report is required. Payments will be made into your preferred account. For no commission transactions, Brandcrush will payout on settlement."
    },{
        question: "Does Brandcrush take a commission?",
        answer: "Yes, there is a transaction fee for each booking and this is dependent on the plan that the activation partner is on."
    },{
        question: "How much should I charge?",
        answer: "The rate you set is entirely up to you. The more value you offer brands, the more you can earn. Active sampling (eg: gift sampling) can earn more than passive sampling (products on a countertop). Our team can provide guidance based on market demand and trends."
    },{
        question: "Can I approve/decline brands who want to activate in my space?",
        answer: "Yes, all activation requests are submitted for approval so you can select the brands that are right for you. Or, you can choose to set up \"auto-approve\" when listing your space."
    },{
        question: "How do I get the Brand’s samples and materials?",
        answer: "Brands will send you product and materials as per the delivery window you will set on your activation spaces."
    },{
        question: "How do I become an Activation Partner?",
        answer: "Sign up for free at brandcrush.com or reach out to our team at concierge@brandcrush.com for a demo of our activation software."
    },{
        question: "How long do I have to respond to a booking request?",
        answer: "Activation partners are encouraged to respond within 24 hours. A space can not be double booked while pending. Any requests pending for five days or more will be automatically declined."
    },{
        question: "Why do I have to submit an activation report?",
        answer: "For all activations that are run by the activation partner you are required to submit an activation report as \"proof of activation\". This not only provides proof but also creates a positive experience for brands who are excited to see how you brought their product to life."
    },{
        question: "Can I include additional terms?",
        answer: "Yes you can notify brands and agencies before you accept their booking request or when you send a proposal that you have supplementary terms."
    },{
        question: "How do I calculate customer reach?",
        answer: "Customer reach is the number of consumers that an activation partner can connect a brand with during an activation. For experiential media: it is how many customers you estimate will receive a sample or marketing message during an activation in your space or at your event. For digital and print media: it is the audience numbers or foot traffic that will see the brand’s message. It is important that businesses do not over-represent their customer reach as it will create logistical issues and a disappointing experience for the brand."
    },{
        question: "What happens if there are samples leftover at the end of a scheduled activation?",
        answer: "Activation partners are required to distribute the number of samples indicated in the booking confirmation. If an extension is required then they must notify Brandcrush immediately via concierge@brandcrush.com or support@brandcrush.com"
    },{
        question: "How do Brands measure activation success?",
        answer: "Brands can activate strategically to support their offline and online retail distribution. We recommend that they include a CTA with their activations to drive measurement.  The more engaged your customers are, the more likely they are to purchase the product/service and the more chance you have of getting another booking."
    },{
        question: "How does Brandcrush ensure activations have been executed?",
        answer: "Brandcrush compiles \"mystery shopper\" reporting across randomly selected activation partners as well as receiving \"photo proof\" for every activation."
    },{
        question: "Can I distribute samples as soon as they arrive?",
        answer: "You need to mark all samples as received under the activation booking. Activations should only take place on the specified activation date. This allows brands to measure the ROI of the activation."
    },{
        question: "Are Brand reviews public?",
        answer: "Yes, reviews will be shown in your space listing. If you require any assistance please contact concierge@brandcrush.com"
    },{
        question: "Can I have a review removed from my profile?",
        answer: "Brandcrush is a community driven marketplace and we value feedback. All users are required to treat each other with respect, honesty and transparency. If you require any assistance please contact support@brandcrush.com"
    },{
        question: "Will my bank details be shown publicly?",
        answer: "No, never. Banking and personal contact details will never be made public and are stored securely in accordance with our Privacy Policy."
    },{
        question: "Will my phone number be shown publicly?",
        answer: "No, never. Banking and personal contact details will never be made public and are stored securely in accordance with our Privacy Policy."
    },{
        question: "How can I get more booking requests?",
        answer: "Activation partners are encouraged to list multiple spaces so that they show up in a higher number of search results. Consider opening up your available dates, listing additional space types and space positions."
    },{
        question: "Are brands allowed to negotiate?",
        answer: "Brands can negotiate for longer-term bookings or if they feel you are overpriced. Brandcrush provides suggested pricing in the space set up process however you are also welcome to contact concierge@brandcrush.com for further information."
    },{
        question: "When do I get paid?",
        answer: "For activations run by activation partners, payment will be released 48 hours (or nearest business day) once you have submitted your activation report. For activations run by Brands, payment will be released within 48 hours of the activation date. For 0% commission transactions. Payment will be released within 48 hours of settlement. Payments will be made into your preferred bank."
    },{
        question: "Can I sign up to multiple activation marketplaces?",
        answer: "Unfortunately no, in order to avoid double bookings we require activation partners to list spaces in an online format, exclusively with Brandcrush."
    },{
        question: "What is the cancellation policy?",
        answer: "View our Terms of Service for full details on cancellation policies."
    },{
        question: "Can I create a long term partnership with a Brand?",
        answer: "Yes, to increase your chances of building ongoing partnership please provide prompt and extensive activation reports."
    }
]

var consumerArr=[
    {
        question: "Can I become an Activation Partner?",
        answer: "If you have a registered business with existing customer reach then Brandcrush is the place for you. Simply sign up and list a space for free."
    }
]



// $(window).on('load resize', function(){
//     var vw = $(window).width() ;
//     if(vw <969 ){
//         $("input[class='search-query']").attr("placeholder", "Where do you want to activate?")
//     }
//     else{
//         $("input[class='search-query']").attr("placeholder", "Where do you want to activate (eg. Melbourne)")
//     }
// })

