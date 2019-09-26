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
    if($('.crushed-on-section').length) {
        $.getJSON( "/blog/top3.json", function( data ) {
            var items = [];
            $.each( data.posts, function( key, val ) {
    const item = '<div class="column is-one-third"><div class="card-box">'
        +'<a href="'+val.link+'"><div class="card-img" style="background-image: url('+val.image+')"></div></a>'
        +'<div class="card-title">'+val.title+'</div>'
        +'<div class="description">'+val.summary+'</div>'
        +'<a class="action-w" href="'+val.link+'">Read More</a>'
        +'</div></div>';
            items.push(item);
            });
        
            $(".crushed-on-section .cards-w .columns").html(items.join(''));
            
        });
    }
    
});
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

function case_studies_init(){
    AOS.refresh();
    $('.category-slider-w').slick({
        centerMode: true,
        arrows: false,
        slidesToShow: 2,
        centerPadding: '20px',
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
        $('.menu-to-sub').click(function(e){
            e.preventDefault();
            $('.menu-level-1').css('display', 'none');
            $('.menu-level-2').css('display', 'block');
        })
        $('.menu-to-back').click(function(e){
            e.preventDefault();
            $('.menu-level-1').css('display', 'block');
            $('.menu-level-2').css('display', 'none');
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
        answer: "Brandcrush is a marketing platform that helps connect Brands with consumers via thousands of Activation Spaces."
    },{
        question: "What's a Brand?",
        answer: "A Brand is any business with a product or message that they want to share with consumers."
    },{
        question: "What's an Activation?",
        answer: "Sampling is the distribution of free product or merchandise, this can be executed by the brand or a dedicated staff member from an Activation Host."
    },{
        question: "What's an Activation Host?",
        answer: "An Activation Host is any business who can leverage existing foot traffic to connect brands with consumers."
    },{
        question: "What's an Activation Space?",
        answer: "An indoor or outdoor location that has physical consumer reach. i.e Unused floor space, a counter top, goodie bag, fridge shelf or gift with purchase"
    },{
        question: "What is \"Gift with Purchase\"",
        answer: "Gift with purchase sampling is when an Activation Host actively distributes product or merchandise to every members/ customer in their business. "
    },{
        question: "What is a Pop Up activation?",
        answer: "Pop Up Activations are a short term retail offering where a brand can sell product in a dedicated Space. i.e A shoe brand selling at a gym."
    },{
        question: "What is an Experiential Activation?",
        answer: "Experiential Activations are where brands create live “sensory” experiences to connect with consumers in high traffic spaces i.e. The entrance to a store or at an event."
    },{
        question: "What is \"Product Reach\"",
        answer: "Product Reach is the number of consumers that can receive a sample or marketing message during an activation. "
    },{
        question: "Is Brandcrush in all countries?",
        answer: "Brandcrush is a global platform. Activations Hosts can sign up and list a space at any time and Brands are welcome to search Spaces in their local area. "
    },{
        question: "How does Brandcrush make money?",
        answer: "Brandcrush take a commission from Activation Hosts and add a service fee for Brands. There are no setup or subscription fees. "
    },{
        question: "Who executes the activation?",
        answer: "Brands can choose to activate with their brand teams or they can request Activation Hosts to activate for them. You can search spaces by how they can be activated. By the brand or by the Activation Host. "
    },{
        question: "Who is responsible for activation merchandise & samples?",
        answer: "Brands and Activation Hosts are both responsible. Brands must ensure product or merchandise arrives 3 days prior to the activation dates and Activation Hosts must ensure that they recieve, unpack, store and or display products to the highest possible standards. Please refer to our terms & conditions for further information. "
    },{
        question: "What happens if an Activation Host doesn't distribute samples?",
        answer: "Brands are protected as Brandcrush only makes payment to an Activation Host upon receipt of an activation report.  In this situation an alternative campaign date is generally rescheduled. "
    },{
        question: "Is Brandcrush cutting out Activation and PR agencies?",
        answer: "Brandcrush work closely with all PR, Activation and Media Agencies as they use our platform as a workflow solution. "
    },{
        question: "How does Brandcrush monitor Activation Hosts & Product Reach estimates?",
        answer: "Brandcrush has a rich insight into foot traffic and reach trends through thousands of space listings. Our platform tracks Product Reach by category to ensure all Space listings fall within a validated threshold. "
    },{
        question: "How does Brandcrush ensure Activations have been executed?",
        answer: "Brandcrush execute \"mystery shopper\" reporting across randomly selected Activation Hosts as well as receiving \"photo proof\" for every Activation."
    }
]

var brandArr=[
    {
        question: "How do samples get distributed?",
        answer: "Once a booking request is approved, Brands can download a CSV spreadsheet that includes a contact person, address, business name and volume of samples required per space. This CSV is then used by the Brands warehouse to distribute samples directly to the Activation Host. "
    },{
        question: "What is the pricing structure? ",
        answer: "Activation Hosts set pricing based on each individual space. Most spaces cost between $0.50 and $1.50 per sample however dedicated staff and niche audiences can attract a higher rate. "
    },{
        question: "What if we are a service based business?",
        answer: "Brands can distribute marketing material and brochures as well as samples. Anything that adds value for consumers and Activation Hosts is a great fit. "
    },{
        question: "Can we book floor space for us to activate?",
        answer: "Yes, simply use our search functionality to find Spaces suitable for your activation. If you find a suitable Space but need a specific space position (floor), then you can message the Activation Host directly with your request. "
    },{
        question: "Can we brief promotional staff for an activation?",
        answer: "Yes, Brands can upload product information, scripts and marketing collateral when they set up their booking request. This is used to educate Activation Hosts and promotional staff on site. "
    },{
        question: "Can we sample and sell product?",
        answer: "Yes, simply use our search functionality to find Spaces that permit selling in their activation spaces. "
    },{
        question: "What campaign reports are provided?",
        answer: "Activation Hosts, that run an activation for a brand,  are required to provide a report at the end of every Activation. This Activation Report includes insights feedback from consumers as well photos of the activation. "
    },{
        question: "How much does it cost?",
        answer: "You can spend as much or as little as you like with Brandcrush, most brands book a volume of Spaces for a one or two week campaign"
    },{
        question: "Can I pay on invoice?",
        answer: "Invoice payment is only available to approved multinational Brands and Agency partners. Please email accounts@brandcrush.com if you would like to request approval. "
    },{
        question: "When is payment processed?",
        answer: "Payment is processed as soon as your activation request is accepted by an Activation Host. You can find a summary of payments in your dashboard. Brandcrush holds payment for a maximum of 5 days while your Activation Request is pending. "
    },{
        question: "What is the Brandcrush service fee?",
        answer: "This helps us run our platform and covers admin, moderation and transaction costs."
    },{
        question: "Why was payment taken before my Activation Request was approved?",
        answer: "Brandcrush holds payment for a maximum of 5 days while your Activation Request is pending."
    },{
        question: "Are there any set up or subscription fee?",
        answer: "No, there are no sign up or subscription fees. Brands are only charged when an Activation Host accepts a booking."
    },{
        question: "Is there a minimum spend?",
        answer: "You can spend as much or as little as you like with Brandcush, most brands book a volume of Spaces for a one or two week campaign"
    },{
        question: "Can we pay with product only?",
        answer: "Unfortunately no, Activation Hosts will only except monetary payment in exchange for their Space. "
    },{
        question: "When should I send merchandise for a campaign?",
        answer: "Samples and materials need to arrive at the Activation Space a minimum of 3 Days prior to your Activation start date. Please include a copy of your Brandcrush booking confirmation with your product delivery for each space.  "
    },{
        question: "Why are my Activation Requests being declined?",
        answer: "Activation Hosts are looking to partner with like minded brands who compliment their existing business, please contact concierge@brandcrush.com to help find suitable spaces. "
    },{
        question: "When will I know if my Activation Request is approved or declined?",
        answer: "Activation Hosts are encouraged to respond in 24 hours or less, the space will be shown as booked until they respond. Any requests pending for 5 Days or more will be automatically declined. "
    },{
        question: "How does Brandcrush ensure Activations have been executed?",
        answer: "Brandcrush execute \"mystery shopper\" reporting across randomly selected Activation Hosts as well as receiving \"photo proof\" for every Activation."
    },{
        question: "Why do brands value experiential and sampling activations?",
        answer: "Research suggests that consumers are much more likely to buy a product after trying it."
    },{
        question: "How much of my budget should be allocated to activations?",
        answer: "Marketers are allocating upto 50% of their budget to experiential marketing."
    },{
        question: "Can I submit a booking request for multiple spaces at once?",
        answer: "Absolutely, you can build a national campaign in a few clicks. Simply add Spaces to a \"Campaign\", provide the booking details and submit your Activation Request. "
    },{
        question: "Can I create a long term partnership with a Space?",
        answer: "Brands can book out Activation Spaces for extended periods providing them with effective or limited exclusivity with an Activation Host. "
    },{
        question: "Can I cancel a booking after being accepted by an Activation Host?",
        answer: "Cancellation requests made 30 Days prior to an Activation date will receive a 100% refund. Any cancellation request made under 30 days of an Activation start date, will be refundable at 50% of the activation rate.  Any cancelation request made under 15 days of an Activation start date, will be non refundable. \nBrandcrush will still charge a 12.5% commission for all cancellation fees."
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
        answer: "Brandcrush connects you with like minded brands who are trying to reach your customers. You get paid to share an actvation space or to distribute their samples/mesages. "
    },{
        question: "What does it cost to list an Activation Space?",
        answer: "Nothing, it's 100% free to sign up and list a space on Brandcrush. We only ever take a 12.5% commission on successful bookings so when you win, we win. "
    },{
        question: "How do I get paid?",
        answer: "Brandcrush pays all Activation Hosts within 48 hours (or nearest business day) of reciving a completed Activation Report where required or from the Activation Date. Payments will be made into your prefered bank. "
    },{
        question: "Does Brandcrush take a commission?",
        answer: "Yes, Brandcrush take a 12.5% commission from Activation Hosts on all bookings. "
    },{
        question: "How much should I charge?",
        answer: "The rate you set is entirely up to you.  The more value you offer brands, the more you can earn. Active sampling (eg: Gift with purchase) can earn more than passive sampling (products on a counter Top) \nMost Activation Hosts charge $0.40 to $1.50  per product reach. For example if your daily product reach is 100 people, you could charge anywhere from $50 to $150 per day. "
    },{
        question: "Can I approve/decline brands who want to activate in my space?",
        answer: "Yes, all Activation Requests are submitted for approval however you can also set up \"auto approve\" when listing your Space. "
    },{
        question: "How do I get the brands samples and materials?",
        answer: "Brands will send you product and materials which will arrive a minimum of 3 days prior to their scheduled Activation Date. "
    },{
        question: "How do I become an Activation Host?",
        answer: "Sign up for free, we accept all businesses who are registered for GST and have an existing foot traffic. "
    },{
        question: "How long do I have to respond to a booking request?",
        answer: "Activation Hosts are encouraged to respond in 24 hours or less. A space can not be double booked while pending. Any requests pending for 5 Days or more will be automatically declined. "
    },{
        question: "Why do I have to submit an Activation report?",
        answer: "For all Activations that are Activated by: Activation Host, you are required to submit an Activation Report as  \"proof of activation\". This not only provides proof but also creates a positive experience for brands who are  excited to see how you brought their product to life. "
    },{
        question: "How do I calculate \"Product Reach\"?",
        answer: "Product reach is the daily distribution capacity for your Space i.e how many samples can you successfully handout per day. "
    },{
        question: "What happens if there are samples leftover at the end of a scheduled activation?",
        answer: "Activation Hosts are required to distribute the number of samples indicated in the booking confirmation. If an extension is required then they must notify Brandcrush immediately via concierge@brandcrush.com"
    },{
        question: "How do brands measure Activation success?",
        answer: "Brands can activate strategically to support their retail footprint, giving them the opportunity measure sales up lift in your area. The more engaged your customers are, the more likely they are to purchase the product and the more chance you have of getting another booking. "
    },{
        question: "How does Brandcrush ensure Activations have been executed?",
        answer: "Brandcrush compile \"mystery shopper\" reporting across randomly selected Activation Hosts as well as receiving \"photo proof\" for every Activation."
    },{
        question: "Can I distribute samples as soon as they arrive?",
        answer: "You need to mark all samples as received under the Activation Booking. Activations should only take place on the specificed activation date. This allows Brands to measure the ROI of the Activation. Brandcrush will also promote consumers and mystery shoppers to visit your business during this time. "
    },{
        question: "Are Brand reviews public?",
        answer: "Yes, reviews will be shown in your Space listing. If you require any assistance please contact concierge@brandcrush.com"
    },{
        question: "Can I have a review removed from my profile?",
        answer: "Brandcrush is a community drive marketplace and we value feedback. All users are required to treat each other with respect, honesty and transparency. If you require any an assistance please contact support@brandcrush.com "
    },{
        question: "Will my bank detail be shown publicly?",
        answer: "No, never. Banking and personal contact details will never be made public and are stored securely in accordance with our Privacy Policy. "
    },{
        question: "Will my phone number be shown publicly?",
        answer: "No, never. Banking and personal contact details will never be made public and are stored securely in accordance with our Privacy Policy. "
    },{
        question: "How can I get more booking requests?",
        answer: "Activation Host's are encouraged to list multiple spaces so that they show up in a higher number of search results. Consider opening up your available dates, listing additional space types and space positions. "
    },{
        question: "Are brands allowed to negotiate?",
        answer: "Brands can negotiate for longer term bookings or if they feel you are over priced. Brandcrush provides suggested pricing in the space set up process however you are also welcome to contact concierge@brandcrush.com for further information. "
    },{
        question: "When do I get paid?",
        answer: "For activations run by our Activation Hosts, payment will be released 24 hours (or nearest business day) once you have submitted your Activation Report. For activations run by our Brands, payment will be released within 24 hours of the activation date. Payments will be made into your preferred bank.  "
    },{
        question: "Can I sign up to multiple Activation Marketplaces?",
        answer: "Unfortunately no, in order to avoid double bookings we require Activation Hosts to list spaces exclusively with Brandcrush."
    },{
        question: "What is the cancellation policy?",
        answer: "There are no subscription fees with Brandcrush, Activation Hosts can pause or delete a listing at anytime and Brands are only charged on a booking by booking basis.  Any cancellation requests made by a Brand 30 Days prior to an Activation date will be fully refunded to the brand. Any cancellation request made under 30 days of an Activation start date, will be refundable to the brand at 50% of the activation rate.  Any cancellation request made by the Brand under 15 days of an Activation start date, will be non refundable. Brandcrush will still charge a 12.5% commission for all cancellation fees and Activation Hosts will receive the net rate as per the brand cancellation charges.  "
    },{
        question: "Can I create a long term partnership with a Brand?",
        answer: "Yes, to increase your chances of building on going partnership please provide prompt and extensive Activation Reports. "
    }
]

var consumerArr=[
    {
        question: "Can I become an Activation Host?",
        answer: "If you have a registered business with existing foot traffic then Brandcrush is the place for you, simply sign up and list a space for free. "
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

