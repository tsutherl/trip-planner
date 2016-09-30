var db = require('./_db');
var Sequelize = require('sequelize')

// define models, make associations, etc.

var Place = db.define('place', { //Place is how we access it with code and place is the table name??
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT), //takes lat ad long as a float(1.2)/idx in array
        allowNull: false
    }
});

var Hotel = db.define('hotel', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    num_stars: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    amenities: {
        type: Sequelize.STRING,//comma delimited string list
        allowNull: true
    },
});

var Activity = db.define('activity', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age_range: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

var Restaurant = db.define('restaurant', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cuisine: {
        type: Sequelize.STRING,//comma delimited string list
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

Hotel.belongsTo(Place);

Activity.belongsTo(Place);

Restaurant.belongsTo(Place);


module.exports = {db, Place, Restaurant, Hotel, Activity};









