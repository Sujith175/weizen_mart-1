

export const labels = ["rice", "maize", "chickpea", "kidneybeans", "pigeonpeas",
    "mothbeans", "mungbean", "blackgram", "lentil", "pomegranate",
    "banana", "mango", "grapes", "watermelon", "muskmelon", "apple",
    "orange", "papaya", "coconut", "cotton", "jute", "coffee"]


// Image paths for each output crop
export const label_image_paths = {
    "rice" : "https://5.imimg.com/data5/VQ/CL/JN/SELLER-51987316/organic-basmati-rice.jpg", 
    "maize": "https://th.bing.com/th/id/OIP.UEwJm0kmOphbhFFTaZegiwHaFD?pid=ImgDet&rs=1", 
    "chickpea": "https://th.bing.com/th/id/OIP.G3DhbK16jX5n4KSEr9n6PgHaG9?pid=ImgDet&rs=1", 
    "kidneybeans":"https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Kidney-beans-8496667.jpg?quality=90&resize=960%2C872", 
    "pigeonpeas": "https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1200,h_1800/https://healthiersteps.com/wp-content/uploads/2020/11/pigeonpeas.jpg", 
    "mothbeans": "https://th.bing.com/th/id/R.c341616f82d7faf544102e89ae6e0378?rik=x%2fwUBXTNA0wffA&riu=http%3a%2f%2fnationaldryfruit.com%2fimages%2fmoth_beans_img.jpg&ehk=V0AhNL5TWn3CyKFvQ%2b0UT6YcLIaWKT%2ful2JlHkio%2fFw%3d&risl=&pid=ImgRaw&r=0", 
    "mungbean": "https://149366112.v2.pressablecdn.com/wp-content/uploads/2018/10/mung-beans-390724_1920.jpg", 
    "blackgram": "https://www.netmeds.com/images/cms/wysiwyg/blog/2019/09/BlackGram_big_1.jpg", 
    "lentil": "https://www.jessicagavin.com/wp-content/uploads/2018/01/what-are-lentils-brown-in-spoon.jpg", 
    "pomegranate": "https://www.theayurveda.org/wp-content/uploads/2015/06/Ripe-pomegranate-fruit.jpg", 
    "banana": "https://th.bing.com/th/id/OIP.emjzYKViT1SKMALrVmqujQHaE8?pid=ImgDet&rs=1", 
    "mango": "https://th.bing.com/th/id/OIP.ReNcTtKOaAXHMNJFOyLBpAHaGa?pid=ImgDet&rs=1", 
    "grapes": "https://th.bing.com/th/id/OIP.KNHJ3Zj5fMpWo1Hhs97uDwHaF7?pid=ImgDet&rs=1", 
    "watermelon": "https://cdn.shopify.com/s/files/1/1698/1675/products/Watermelon_Calsweet.jpg?v=1557505357", 
     "muskmelon": "https://cdn.shopify.com/s/files/1/1380/2059/products/shutterstock_306772649.jpg?v=1483512638", 
     "apple": "https://hilliardstudiomethod.com/wp-content/uploads/2017/01/Apple.jpg", 
    "orange": "https://th.bing.com/th/id/OIP.T1Xb-E5pFGEFupDg4d7BsQHaGb?pid=ImgDet&rs=1", 
    "papaya": "https://th.bing.com/th/id/OIP.pKRjPitn2iMbBvBsHudilgHaFj?pid=ImgDet&rs=1", 
    "coconut": "https://th.bing.com/th/id/OIP.-NYj78iOSNzZx43RanjepQHaF0?pid=ImgDet&rs=1", 
    "cotton": "https://ethicallysustained.files.wordpress.com/2013/05/cotton_bolls_7.jpg", 
    "jute": "https://i.pinimg.com/originals/60/ef/05/60ef0568fdace5fbab39a148b38f9cb3.jpg", 
    "coffee": "https://www.wikihow.com/images/1/1f/Roast-Coffee-Beans-Final.jpg", 
}


// Descriptions for each crop predicted by the ML model.
export const output_descriptions = {

    "rice": `Rice is a highly adaptable crop that can thrive in a wide range of soil types, including those with high levels of nitrogen, phosphorous, and humidity. It is a great crop for farmers who want to make the most of their rainfall, as it is extremely efficient at using water and can yield up to 10 times more grain per unit of water compared to other cereal crops. Rice is also a great choice for farmers who are looking to diversify their crop rotation, as it can help to improve soil health by fixing nitrogen back into the soil. Plus, rice is a staple food for billions of people around the world, so with the right marketing strategy, you could potentially sell your rice for a premium price. And let's be real, who doesn't love a good bowl of rice? It's the perfect blank canvas for any type of dish, and it's super versatile - you can cook it in a rice cooker, on the stovetop, or even in the microwave. So if you're looking to add a tasty and profitable crop to your farm, consider giving rice a try. With the right soil conditions and a little bit of TLC, you could be well on your way to a successful rice harvest.`,
    "maize": ` If you're looking to add some diversity to your crop rotation, maize might be the perfect choice for you! Not only is it a highly nutritious and versatile grain, but it's also well-suited to a variety of soil conditions. With its moderate nitrogen requirements and ability to thrive in both high and low phosphorus soils, maize is a reliable choice no matter what your farm's nutrient profile looks like. Plus, with its tolerance for a range of rainfall and humidity levels, you won't have to worry about the weather ruining your harvest. And if you're concerned about pH, maize is a pretty forgiving crop - it can grow in soils with a pH range of 5.5 to 7.5. So why wait? Start planting some maize today and watch your profits grow! `,
    "chickpea": ` Chickpeas are a versatile and nutritious crop that can thrive in a variety of soil conditions. In terms of nutrients, they are known to be a good source of nitrogen, phosphorous, and other minerals that can help improve soil health over time. They are also relatively drought-tolerant and can thrive in areas with moderate rainfall, making them a great choice for farmers dealing with unpredictable weather patterns. In terms of pH levels, chickpeas are known to be adaptable and can grow in soil with a wide range of pH levels. This makes them a great choice for farmers who may not have the time or resources to constantly monitor and adjust their soil pH. And let's not forget about the delicious, protein-packed hummus that can be made from chickpeas! So not only are you helping to improve the health of your soil, you're also providing a tasty and healthy food source for your family and community. Plus, with all the chickpea jokes out there (chickpeas are "humor-ous," get it?), you'll have plenty of material for a good laugh while you're out in the fields. `,
    "kidneybeans": ` Kidney beans are an excellent choice for farmers looking to add a high-yielding and nutritious crop to their fields. Not only do these beans thrive in well-draining soil with a pH between 6.0 and 6.8, but they also require moderate levels of nitrogen and phosphorous to grow to their full potential. Additionally, kidney beans are well-suited to areas with moderate rainfall and humidity, making them a great option for farmers who may be facing water restrictions or drought conditions. With their high protein content and versatility in the kitchen, kidney beans are sure to be a hit with both farmers and consumers alike. So why not give them a try? Your fields (and taste buds) will thank you! `,
    "pigeonpeas": ` Pigeonpeas are a great crop for any farmer looking to diversify their portfolio and bring in some tasty, nutritious legumes. Not only are they packed with protein and other essential nutrients, but they're also relatively easy to grow, especially if you have soil with a moderate pH level and plenty of phosphorous and nitrogen available. Plus, pigeonpeas are known to be quite drought-tolerant, making them a great option for areas with variable rainfall patterns. And let's not forget about the humidity - these little legumes love a good, humid environment, so if your fields tend to get a little steamy, pigeonpeas will thrive. So go ahead and give them a try - your taste buds (and your wallet) will thank you! `,
    "mothbeans": ` Mothbeans, also known as matki or dew beans, are a nutritious and drought-resistant legume that are perfect for growing in your farm. With their high levels of protein and low maintenance requirements, they are an excellent choice for any farmer looking to diversify their crop rotation. Plus, they have a unique and delicious flavor that will be sure to impress your customers. When it comes to soil properties, mothbeans are quite adaptable. They can thrive in a variety of soil types, including those with moderate levels of nitrogen and phosphorous. They also prefer a slightly acidic soil pH, so if your farm's soil is on the alkaline side, don't worry - a little bit of lime can go a long way in balancing out the pH. As far as rainfall and humidity go, mothbeans are quite drought-tolerant, but they do prefer a bit of moisture to help them grow. So, if you have a farm with average rainfall and humidity levels, you're in luck - mothbeans will be right at home. Overall, if you're looking to add a tasty and low-maintenance crop to your farm, give mothbeans a try - you won't be disappointed!`,
    "mungbean": ` "Mungbeans are a great crop to grow on your farm, especially if you have well-draining soil with a pH between 6.0 and 6.5. These little beans are packed with nitrogen-fixing power, which means they'll help enrich your soil as they grow. Plus, they're relatively drought-tolerant, so you won't have to worry about watering them too often. Just make sure you have enough rainfall (or irrigation) to get them started, and they'll take care of the rest. And if you're looking to add a little variety to your rotation, mungbeans are a great option. They're a great source of protein and can be used in a variety of dishes, from soups and stews to sprouts and salads. Just be sure to give your mungbean plants plenty of sunshine and a little bit of TLC, and you'll be reaping the rewards in no time. So go ahead and give mungbeans a try – your soil (and taste buds) will thank you!" `,
    "blackgram": ` Growing blackgram can be a great choice for your farm! Not only is it a highly nutritious pulse crop, but it's also relatively easy to grow. First off, blackgram thrives in well-draining soil with a pH level between 6 and 7.5, and it prefers moderate to high levels of humidity. Luckily, it sounds like you already have the perfect soil conditions for this crop! In terms of nutrients, blackgram is a bit of a hungry plant. It loves nitrogen and phosphorous, so be sure to give it a little extra TLC with some well-balanced fertilizers. And when it comes to rainfall, blackgram is pretty adaptable. It can handle anywhere from 20-100 inches of rain per year, so whether you're dealing with a drought or a deluge, this crop should be able to hold its own. Overall, blackgram is a reliable, high-yield crop that's sure to bring in some tasty profits for your farm. So why not give it a try? You might just find that it's the pulse of the party! `,
    "lentil": ` Lentils are an excellent crop to consider growing on your farm, especially if you have soil with a good balance of nutrients and the right amount of rainfall and humidity. They are a legume, which means they have the ability to fix nitrogen from the air and add it to the soil, improving its fertility and helping to reduce the need for synthetic fertilizers. Lentils also have a relatively low requirement for phosphorous, so they can thrive in soil with lower levels of this nutrient. In terms of pH, lentils prefer slightly acidic soil, around a pH of 6.0 to 6.5. So if you've got soil that falls within that range, you're in luck! Additionally, lentils are a hardy crop that can withstand drought conditions better than some other grains, making them a good choice for farmers in areas with variable rainfall. All in all, lentils are a nutritious and profitable crop that can bring a variety of benefits to your farm. Plus, they're delicious in a variety of dishes, so you'll have plenty of tasty meals to enjoy as well! `,
    "pomegranate": ` Pomegranates are a great crop to grow for a variety of reasons. For one, they thrive in well-draining soil with a pH level between 6.0 and 7.0, just like the soil you have on your farm! They also prefer a sunny location with moderate humidity, which is perfect for your region. In terms of nutrients, pomegranates love a little bit of nitrogen and phosphorous, both of which are essential for healthy growth. And as an added bonus, pomegranates are drought-tolerant, so they can withstand dry spells without any problems. Plus, who wouldn't want to add a little color and flavor to their farm with these beautiful, juicy fruit? Trust me, your customers will thank you for introducing pomegranates to your crop lineup. `,
    "banana": ` If you're a farmer looking to diversify your crops and add some tropical flavor to your farm, consider planting bananas! These delicious and versatile fruits are relatively low maintenance and easy to grow. When it comes to soil, bananas prefer well-draining soil with a pH level between 5.5 and 6.5. As long as you can provide these conditions, you'll be well on your way to a successful banana harvest. One great thing about bananas is that they don't require a lot of fancy nutrients to thrive. In fact, they are known for being able to take care of themselves when it comes to things like Nitrogen and Phosphorous. All they really need is plenty of rainfall and humidity to thrive. So if you've got a humid climate with regular rain, you're in luck! In addition to being easy to grow and delicious, bananas also add a touch of paradise to any farm. With their tropical vibe, they're sure to be a hit with visitors and customers alike. So don't be afraid to give bananas a try - you won't be disappointed! `,
    "mango": ` If you're a farmer looking to add some tropical flair to your crop rotation, look no further than mangoes! Not only are they deliciously sweet and versatile in the kitchen, but they're also relatively low maintenance when it comes to soil requirements. Mangoes prefer well-draining soil with a pH between 6 and 7, so if you've got a field that's a bit on the alkaline side, mangoes might be just the crop for you. As for nutrients, mango trees are greedy for nitrogen, so make sure to give them a good dose of compost or organic matter to keep them happy. And when it comes to rainfall, mangoes are quite adaptable and can thrive in both humid and dry climates as long as they get enough water. Just make sure to give them plenty of sun and a little bit of TLC, and you'll be rewarded with a bounty of juicy, mouthwatering mangoes in no time! `,
    "grapes": ` Grapes are a great crop to consider for your farm! Not only are they delicious and versatile, but they also have several benefits in terms of soil properties. Firstly, grapes thrive in well-draining soil with a pH level between 6.0 and 6.5. Lucky for you, it sounds like your soil is just the right pH for grape cultivation. Additionally, grapes require moderate amounts of nitrogen and phosphorous to grow, both of which are essential nutrients that your soil is surely providing. With adequate rainfall and humidity, your grapes will be off to a great start. Plus, who wouldn't love having their own homegrown grapes to snack on or turn into a tasty wine? Give grapes a try and you'll be sure to have a crop that's both enjoyable and profitable. `,
    "watermelon": ` Watermelon is a delicious and refreshing summer fruit that is easy to grow and requires minimal maintenance. If you have the right soil conditions, watermelon can be a great crop for your farm. The key to growing healthy watermelons is having soil with a pH level between 6.0 and 6.8, as well as adequate levels of nitrogen and phosphorous. Watermelons also need plenty of water, so make sure you have access to irrigation or are located in an area with high humidity or sufficient rainfall. With the right combination of these factors, you'll be on your way to a bountiful harvest of juicy, sweet watermelons that will have your customers coming back for more. Plus, you'll have the added bonus of being able to beat the heat on hot summer days by munching on a few slices of your own homegrown watermelons. So go ahead and give watermelon a try – your taste buds (and wallet) will thank you! `,
    "muskmelon": ` If you're a farmer looking to add some variety to your crop lineup, consider giving muskmelon a try! This delicious fruit is perfect for those who have access to well-draining soil with a pH between 6.0 and 6.8. It's a heavy feeder, so be sure to provide it with ample amounts of nitrogen and phosphorous to ensure healthy growth and fruit production. It also thrives in environments with moderate levels of humidity and plenty of sunshine, and needs a consistent supply of water to thrive. Aim for about 1 inch of water per week, either through irrigation or natural rainfall. And with its high demand in the market, you'll be able to turn a tidy profit by growing muskmelon. Plus, who doesn't love a good melon on a hot summer day? Trust me, your customers will be thanking you for bringing this tasty treat to the table `,
    "apple": ` If you're looking for a tasty and profitable crop to add to your farm, look no further than apples! These tasty fruits are not only delicious and versatile, but they are also relatively easy to grow and maintain. As long as you have well-draining soil with the right balance of nitrogen, phosphorous, and pH levels, your apple trees will be happy as can be. And don't worry about those pesky rain and humidity levels - apples are resilient little guys and can handle a wide range of weather conditions. Plus, they have a long growing season, which means you'll have plenty of time to enjoy their delicious fruits. And the best part? There are so many ways to enjoy apples. From pies and crisps to cider and caramel apples, the possibilities are endless. So go ahead and give apples a try - your taste buds (and wallet) will thank you. `,
    "orange": ` If you're looking to add some zesty flair to your farm, then look no further than the delicious and nutritious orange! Not only do oranges add a pop of color to your fields, but they also require relatively moderate levels of nutrients like nitrogen and phosphorous. Plus, with their love for warm temperatures and moderate humidity, they'll thrive in your farm's climate. And don't worry about needing perfectly balanced soil pH levels - oranges are pretty adaptable and can grow in soil ranging from slightly acidic to slightly alkaline. In addition to being a tasty and healthy addition to any meal, oranges are also a popular commodity in the agricultural market, so you can expect to see a good return on your investment. And with the right amount of rainfall, you'll be harvesting juicy, sun-ripened oranges in no time. So why not give these tasty treats a try and add some diversity to your crop rotation? `,
    "papaya": ` Papaya is a tropical fruit that is packed with nutrients and has numerous health benefits. Not only is it a good source of vitamin C and potassium, but it also contains antioxidants and digestive enzymes that can improve digestion and boost the immune system. Papaya is a low maintenance crop that is well-suited to a variety of soil types, as long as the soil is well-draining and has a pH level between 5.5 and 6.5. It also prefers a humid environment with consistent rainfall or irrigation, so if you have a greenhouse or a location on your farm that gets plenty of humidity, papaya may be a great choice for you. In terms of nutrient requirements, papaya plants prefer moderate levels of nitrogen and phosphorous, so you don't have to worry about over-fertilizing. Plus, with its high market demand and versatility in cooking, growing papaya can be a profitable and enjoyable venture for your farm. So don't wait - start planning your papaya patch today! `,
    "coconut": ` Coconuts are a tropical crop that thrive in warm, humid environments with plenty of rainfall. They prefer soil with a pH level between 6 and 7, and they require moderate amounts of nitrogen and phosphorous for healthy growth. If you already have these soil conditions in your farm, then you're in luck! Coconuts are a great crop to grow because they are highly drought-resistant and can withstand long periods without water. Plus, they have a host of other benefits. For example, the oil from coconuts has numerous health benefits and can be used in cooking, cosmetics, and even as a natural hair conditioner. The meat of the coconut is also delicious and can be used in a variety of dishes. And let's not forget about the refreshing coconut water, which is a tasty and hydrating drink that is sure to quench your thirst on a hot day. So if you're looking to add a little tropical flair to your farm, consider giving coconuts a try! `,
    "cotton": ` Growing cotton can be a great choice for your farm! Not only is it a versatile and valuable crop, but it also has some specific soil requirements that your farm seems to already have in abundance. For example, cotton thrives in well-draining soil with a pH level between 6.0 and 6.8, and it's a good thing your soil has just the right pH! Additionally, cotton plants need plenty of nitrogen to grow strong and healthy, and it looks like your soil has more than enough nitrogen to support a thriving cotton crop. And let's not forget about rainfall and humidity - both of which seem to be perfectly suited for growing cotton on your farm. All in all, it looks like you have all the makings of a successful cotton farmer. Plus, think of all the cute, fluffy bolls you'll be able to pick come harvest time! `,
    "jute": ` Jute is a fantastic crop that is not only environmentally friendly, but it also has a variety of uses, from making burlap sacks to creating fabric for clothing and home furnishings. In fact, jute is often referred to as the 'golden fiber' due to its versatility and value. Growing jute is a great way to add some diversity to your crop rotation and potentially increase your profits. It's also a low maintenance crop that thrives in well-draining soil with a pH between 6.0 and 7.0. It requires relatively low levels of Nitrogen and Phosphorous, and it can tolerate moderate levels of rainfall and humidity. If your soil is rich in these nutrients and you get plenty of rainfall and humidity, then jute might just be the perfect crop for you. Give it a try and see how it works out - you might be surprised at how well it grows! Not to mention, you'll be helping to preserve the environment by growing a sustainable and biodegradable crop. `,
    "coffee": ` Coffee is a great crop to consider growing! Not only is it a popular and lucrative crop, but it can also thrive in a variety of soil conditions. For starters, coffee plants require well-draining soil with a slightly acidic pH level between 6.0 and 6.5. If your soil is already in this range, you're off to a great start! In terms of nutrients, coffee plants need a moderate amount of nitrogen, phosphorous, and potassium to thrive. If your soil is already rich in these nutrients, your coffee plants will be able to draw on them as needed. As for water, coffee plants prefer a humid climate with regular rainfall. If you already have a humid environment with a consistent source of water, your coffee plants will be able to soak up all the hydration they need. So, if you've got the right soil conditions and a love for a good cup of joe, give coffee a try! `,
}

