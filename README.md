# Tuffy's Bookstore
This was created as part of my coursework for my first year of BSc Computer Science and recieved a first class grade (70%).

I created a small bookstore website featuring books and manga, with prices, descriptions, cover images, and “Buy Now” buttons. Selecting a book opens the payment page.

The project uses:
index.html for the storefront and featured book listings.
pay.html for the payment form, linked to the shared stylesheet and JavaScript.
payment.js to check the entered card details and submit them to the project’s API endpoint. If accepted, it redirects to the confirmation page with only the card’s last four digits in the URL.
success.html to show the payment confirmation and display those final four digits.
style.css to style the pages and adjust the layout for smaller screens.
