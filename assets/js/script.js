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
        answer: "Brandcrush is a brand activation and media partnerships platform. Through Brandcrush, businesses can unlock and manage their owned media with a smart listing and booking solution, while Brands and agencies can discover and scale brand experiences to engage hypertargeted audiences.  "
    },{
        question: "What's a Brand?",
        answer: "A Brand is any business with a product or message that they want to share with consumers."
    },{
        question: "What's an Activation?",
        answer: "An activation is a brand experience that makes your brand known to people, increasing awareness and engagement."
    },{
        question: "What's an Activation Host?",
        answer: "An Activation Host is any business who can leverage their existing customer reach to connect brands with consumers."
    },{
        question: "What's an Activation Space?",
        answer: "An activation space is a brand opportunity that offers either a physical or digital consumer reach. i.e a popup space, sponsorship, digital placement, gift sampling."
    },{
        question: "What is an Experiential Activation?",
        answer: "Experiential Activations are where brands create live “sensory” experiences to connect with consumers in high traffic spaces i.e. The entrance to a store or at an event."
    },{
        question: "What is \"Customer Reach\"",
        answer: "Customer reach is the number of consumers that an Activation Host can connect a Brand with during an activation. For experiential media: it is how many customers you estimate will receive a sample or marketing message during an activation in your space or at your event. For digital and print media: it is the audience numbers or foot traffic that will see the Brands message. It is important that businesses do not over-represent their customer reach as it will create logistical issues and a disappointing experience for the Brand."
    },{
        question: "Is Brandcrush in all countries?",
        answer: "Brandcrush is a global platform. Activations Hosts can sign up and list a space at any time and Brands can search spaces by region."
    },{
        question: "How does Brandcrush make money?",
        answer: "Brandcrush is a SaaS enabled marketplace. We charge transaction fees and subscription fees for use of the platform and offer a range of subscription types from basic level with no sign-up fees, through to an enterprise level."
    },{
        question: "Who executes the activation?",
        answer: "Brands can choose to activate with their brand teams or they can request Activation Hosts to activate for them. Brands can search spaces by whether they will be activated by the Brand or by the Activation Host."
    },{
        question: "Who is responsible for activation merchandise & samples?",
        answer: "Brands and Activation Hosts are both responsible. Brands must ensure product or merchandise arrives a  minimum of three days prior to the activation dates (or as stated on the activation booking details) and Activation Hosts must ensure that they receive, unpack, store and/or display products to the highest possible standards. Please refer to our terms & conditions for further information."
    },{
        question: "What happens if an Activation Host doesn't distribute samples?",
        answer: "Brands are protected as Brandcrush only makes payment to an Activation Host upon receipt of an activation report. In this situation, an alternative campaign date is generally rescheduled."
    },{
        question: "Is Brandcrush cutting out Activation and PR agencies?",
        answer: "Not at all. Brandcrush works closely with all PR, Activation and Media Agencies, offering our platform as a workflow solution for their clients."
    },{
        question: "How does Brandcrush monitor Activation Hosts & Customer Reach estimates?",
        answer: "Brandcrush has rich insight into foot traffic and reach trends through the thousands of space listed on our platform. We track and compare customer reach by category to ensure all space listings fall within a validated threshold."
    },{
        question: "How does Brandcrush ensure activations have been executed?",
        answer: "Brandcrush executes \"mystery shopper\" reporting across randomly selected Activation Hosts as well as receiving \"photo proof\" for every activation."
    }
]

var brandArr=[
    {
        question: "What is a \"gift sampling\" activation?",
        answer: "Gift sampling is when product samples or special offers are given to customers as a free gift, giving brands real-world endorsement and new connections."
    },
    {
        question: "What is a \"booth or popup\" activation?",
        answer: "Popup activations are a short term retail offering where a brand can sell product in a dedicated space. i.e a shoe brand selling at a gym or in a shopping mall."
    },
    {
        question: "What is \"D2C sampling\"?",
        answer: "Product samples and brand offers are added into online shopping deliveries and subscription boxes and delivered directly to consumers."
    },
    {
        question: "What is a bathroom activation?",
        answer: "Catch people at the right place and time by placing personal care, cosmetics or wellness products in bathrooms. This passive self-serve activation will invite customers to interact with your brand in an organic way when they will appreciate it most."
    },
    {
        question: "What is a counter-top activation?",
        answer: "Create a passive display for brands on counter-tops, catching the eye of customers while they're ordering coffee or paying the bill. This display could include a sample of your product, brand messaging, a discount voucher, or any other incentive."
    },
    {
        question: "What is a decal/poster activation?",
        answer: "Brands can feature messages on decals & posters in a business space."
    },
    {
        question: "What is a digital screen activation?",
        answer: "Reach customers on their path to purchase with rich video content delivered via in-store display screens."
    },
    {
        question: "What is a digital sponsorship?",
        answer: "Brands are promoted via live streaming channels, email marketing and social media."
    },
    {
        question: "What is an event sponsorship?",
        answer: "Engage with event attendees by sponsoring an event. Event sponsorship details are specific to each event."
    },
    {
        question: "What is an \"on the menu\" activation?",
        answer: "Feature your food or beverage in special \"on the menu\" items in popular cafes and restaurants. . Suggest a recipe to showcase your item, or let r resident chef come up with something truly memorable on your behalf."
    },
    {
        question: "What is an \"on the trainer\" activation?",
        answer: "Popular fitness trainers become ambassadors for your brand by wearing your sports apparel or work-out accessories."
    },
    {
        question: "What is a goody bag activation?",
        answer: "Access engaged event attendees and have your product, message or voucher included in event goody bags. This is an easy, no-fuss activation which lets you leverage existing associations and join in with other brands on a group marketing effort."
    },
    {
        question: "What is a roaming activation?",
        answer: "Brands bring in their own roaming brand ambassadors to take product samples and messages to the people."
    },
    {
        question: "What is a takeover activation?",
        answer: "Brands bring in their own team and branding to take over a Host space (and socials) for a day — perfect for special occasions like PR events, parties and product launches."
    },
    {
        question: "What is a street space activation?",
        answer: "Connect with consumers passing by in high foot-traffic street spaces."
    },
    {
        question: "How do samples get distributed?",
        answer: "Once a booking request is approved, Brands can download a CSV spreadsheet that includes a contact person, address, business name and volume of samples required per space. This CSV is then used by the Brands' warehouse to distribute samples directly to the Activation Host. Brandcrush can also provide a full delivery concierge service if needed. "
    },{
        question: "What is the pricing structure for spaces?",
        answer: "As this is a media activation and partnerships platform, Activation Hosts set their own pricing for their activation opportunities."
    },{
        question: "What if we are a service based business?",
        answer: "Brands can distribute marketing material and brochures as well as samples. Anything that adds value for consumers and Activation Hosts is a great fit. "
    },{
        question: "Can we book floor space for us to run our own activation?",
        answer: "Yes, simply use our search function to find spaces suitable for your activation. If you find a suitable space but need a specific space position (eg. floor), then you can message the Activation Host directly with your request."
    },{
        question: "Can we brief promotional staff for an activation?",
        answer: "Yes, Brands can upload product information, scripts and marketing collateral when they set up their booking request. This is used to educate Activation Hosts and promotional staff on site. "
    },{
        question: "Can we sample and sell product?",
        answer: "Yes, simply use our search functionality to find Spaces that permit selling in their activation spaces. "
    },{
        question: "What campaign reports are provided?",
        answer: "When an Activation Host runs an activation for a Brand, they are required to provide a report at the end of every activation. This report includes insights, feedback from consumers as well as photos of the activation."
    },{
        question: "How much does it cost to book an activation?",
        answer: "You can spend as much or as little as you like with Brandcrush. Most brands book a volume of spaces for a one or two week campaign"
    },{
        question: "Can I pay on invoice?",
        answer: "Invoice payment is only available to approved multinational Brands and Agency partners. Please email accounts@brandcrush.com if you would like to request approval."
    },{
        question: "When is payment processed?",
        answer: "Payment is processed as soon as your activation request is accepted by an Activation Host. You can find a summary of payments in your dashboard. Brandcrush holds the payment for a maximum of five days while your activation request is pending."
    },{
        question: "What is the Brandcrush service fee?",
        answer: "This helps us run our platform and covers admin, moderation and transaction costs."
    },{
        question: "Why was payment taken before my Activation Request was approved?",
        answer: "Brandcrush holds payment for a maximum of five days while your Activation Request is pending."
    },{
        question: "Are there any set up or subscription fees?",
        answer: "Brandcrush has payment plans to suit all businesses. Our basic plan is pay-as-you-go with no subscription fees. Our Starter and Professional plans offer advanced features for a monthly subscription fee."
    },{
        question: "Is there a minimum spend?",
        answer: "You can spend as much or as little as you like with Brandcush, most brands book a volume of spaces for a one or two week campaign"
    },{
        question: "Can we pay with product only?",
        answer: "Sometimes, yes. Use our search function to find product-in-kind opportunities on the platform."
    },{
        question: "When should I send merchandise for a campaign?",
        answer: "Samples and materials need to arrive at the activation space a minimum of three days prior to your activation start date, or as stated on your activation booking. Please include a copy of your Brandcrush booking confirmation with your product delivery for each space."
    },{
        question: "Why are my activation requests being declined?",
        answer: "Activation Hosts are looking to partner with like-minded brands who complement their existing business and delight their customers. Please contact concierge@brandcrush.com to help find suitable spaces."
    },{
        question: "When will I know if my activation request is approved or declined?",
        answer: "Activation Hosts are encouraged to respond within 24 hours. The space will be shown as booked until they respond. Any requests pending for five days or more will be automatically declined."
    },{
        question: "How does Brandcrush ensure activations have been executed?",
        answer: "Brandcrush execute \"mystery shopper\" reporting across randomly selected Activation Hosts as well as receiving \"photo proof\" for every activation."
    },{
        question: "Why do brands value experiential and sampling activations?",
        answer: "Research suggests that consumers are much more likely to buy a product after trying it."
    },{
        question: "How much of my budget should be allocated to activations?",
        answer: "Marketers are allocating up to 50% of their budget to experiential marketing."
    },{
        question: "Can I submit a booking request for multiple spaces at once?",
        answer: "Absolutely, you can build a national campaign in a few clicks. Simply add spaces to a \"Campaign\", provide the booking details and submit your activation request. "
    },{
        question: "Can I create a long term partnership with a space?",
        answer: "Brands can book out Activation Spaces for extended periods providing them with effective or limited exclusivity with an Activation Host. "
    },{
        question: "Can I cancel a booking after being accepted by an Activation Host?",
        answer: "Cancellation requests made 30 days prior to an activation date will receive a 100% refund. Any cancellation request made less than 30 days before the activation start date will be refundable at 50% of the activation rate. Any cancellation request made in less than 15 days of an activation start date will be non-refundable. Brandcrush will still charge transaction fees on all cancellation fees."
    },{
        question: "What happens to our product, samples & materials if we cancel an Activation and items have already been delivered ?",
        answer: "Brands can arrange for pick up and return of product & materials at their own expense or message Activation Hosts to arrange the activation for another booking date. "
    },{
        question: "Can I negotiate with an Activation Host?",
        answer: "Activation Hosts set prices based on what the marketplace is prepared to pay. You can negotiate for longer term bookings or if you feel they are over priced via in app messaging. "
    }
]

var activationArr=[
    {
        question: "What brands use Brandcrush?",
        answer: "Brandcrush connects you with like-minded brands who are trying to reach your customers through high engagement activation opportunities."
    },{
        question: "What does it cost to list an Activation Space?",
        answer: "Nothing! It's 100% free to sign up and list a space on Brandcrush. Our Basic subscription offers a pay-per-booking model, whereas our Starter and Professional plans offer additional features and reduced transactional cost for a monthly fee."
    },{
        question: "How do I get paid?",
        answer: "Brandcrush pays all Activation Hosts within 48 hours (or nearest business day) of receiving a completed activation report, or from the Activation Date if no report is required. Payments will be made into your preferred account."
    },{
        question: "Does Brandcrush take a commission?",
        answer: "Yes, there is a transaction fee for each booking and this is dependent on the plan that the Activation Host is on. "
    },{
        question: "How much should I charge?",
        answer: "The rate you set is entirely up to you. The more value you offer brands, the more you can earn. Active sampling (eg: Gift sampling) can earn more than passive sampling (products on a counter top)."
    },{
        question: "Can I approve/decline brands who want to activate in my space?",
        answer: "Yes, all activation requests are submitted for approval so you can select the Brands that are right for you. Or, you can choose to set up \"auto-approve\" when listing your space."
    },{
        question: "How do I get the brands samples and materials?",
        answer: "Brands will send you product and materials which will arrive a minimum of three days prior to their scheduled activation date."
    },{
        question: "How do I become an Activation Host?",
        answer: "Sign up for free! We accept all businesses who are registered for GST and have an existing customer reach."
    },{
        question: "How long do I have to respond to a booking request?",
        answer: "Activation Hosts are encouraged to respond within 24 hours. A space can not be double booked while pending. Any requests pending for five days or more will be automatically declined."
    },{
        question: "Why do I have to submit an activation report?",
        answer: "For all activations that are run by the Activation Host you are required to submit an activation report as \"proof of activation\". This not only provides proof but also creates a positive experience for brands who are excited to see how you brought their product to life."
    },{
        question: "How do I calculate \"Customer Reach\"?",
        answer: "Customer reach is the number of consumers that an Activation Host can connect a Brand with during an activation. For experiential media: it is how many customers you estimate will receive a sample or marketing message during an activation in your space or at your event. For digital and print media: it is the audience numbers or foot traffic that will see the Brands message. It is important that businesses do not over-represent their customer reach as it will create logistical issues and a disappointing experience for the Brand."
    },{
        question: "What happens if there are samples leftover at the end of a scheduled activation?",
        answer: "Activation Hosts are required to distribute the number of samples indicated in the booking confirmation. If an extension is required then they must notify Brandcrush immediately via concierge@brandcrush.com"
    },{
        question: "How do brands measure activation success?",
        answer: "Brands can activate strategically to support their retail footprint, giving them the opportunity measure sales uplift in your area. The more engaged your customers are, the more likely they are to purchase the product and the more chance you have of getting another booking."
    },{
        question: "How does Brandcrush ensure activations have been executed?",
        answer: "Brandcrush compile \"mystery shopper\" reporting across randomly selected Activation Hosts as well as receiving \"photo proof\" for every Activation."
    },{
        question: "Can I distribute samples as soon as they arrive?",
        answer: "You need to mark all samples as received under the activation booking. Activations should only take place on the specified activation date. This allows Brands to measure the ROI of the activation. Brandcrush will also promote consumers and mystery shoppers to visit your business during this time."
    },{
        question: "Are Brand reviews public?",
        answer: "Yes, reviews will be shown in your Space listing. If you require any assistance please contact concierge@brandcrush.com"
    },{
        question: "Can I have a review removed from my profile?",
        answer: "Brandcrush is a community driven marketplace and we value feedback. All users are required to treat each other with respect, honesty and transparency. If you require any an assistance please contact support@brandcrush.com"
    },{
        question: "Will my bank detail be shown publicly?",
        answer: "No, never. Banking and personal contact details will never be made public and are stored securely in accordance with our Privacy Policy. "
    },{
        question: "Will my phone number be shown publicly?",
        answer: "No, never. Banking and personal contact details will never be made public and are stored securely in accordance with our Privacy Policy. "
    },{
        question: "How can I get more booking requests?",
        answer: "Activation Hosts are encouraged to list multiple spaces so that they show up in a higher number of search results. Consider opening up your available dates, listing additional space types and space positions."
    },{
        question: "Are brands allowed to negotiate?",
        answer: "Brands can negotiate for longer-term bookings or if they feel you are overpriced. Brandcrush provides suggested pricing in the space set up process however you are also welcome to contact concierge@brandcrush.com for further information."
    },{
        question: "When do I get paid?",
        answer: "For activations run by Activation Hosts, payment will be released 24 hours (or nearest business day) once you have submitted your activation report. For activations run by Brands, payment will be released within 24 hours of the activation date. Payments will be made into your preferred bank."
    },{
        question: "Can I sign up to multiple activation marketplaces?",
        answer: "Unfortunately no, in order to avoid double bookings we require Activation Hosts to list spaces exclusively with Brandcrush."
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
        question: "Can I become an Activation Host?",
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

