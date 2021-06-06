import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
    carouselContainer: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    card: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        borderRadius: '2px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const images = [
    "https://ramsons-banners.s3.ap-south-1.amazonaws.com/samosa+banner.jpg",
    "https://ramsons-banners.s3.ap-south-1.amazonaws.com/chana+poori.JPG",
    "https://ramsons-banners.s3.ap-south-1.amazonaws.com/dokla+banner.jpg",
    "https://ramsons-banners.s3.ap-south-1.amazonaws.com/caker+banner.jpg",
    "https://ramsons-banners.s3.ap-south-1.amazonaws.com/banner+rasmalai.jpg",
    "https://ramsons-banners.s3.ap-south-1.amazonaws.com/banner+laddu.jpg",
    "https://ramsons-banners.s3.ap-south-1.amazonaws.com/banner+biscuit+2.jpg"
]

const responsive = {
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 40
    }
};

const CarouselWrapper = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.carouselContainer} elevation={0}>
           <Carousel
                partialVisible={true}
                draggable={false}
                showDots={false}
                autoPlay={true}
                infinite={true}
                autoPlaySpeed={5000}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                //customTransition="all .5"
                transitionDuration={2000}
                removeArrowOnDeviceType={["mobile"]}
                deviceType={"mobile"}
                >
                    {
                        images.map((image, index) => {
                            return (
                                <Card className={classes.card} key={index}>
                                    <CardMedia
                                        className={classes.media}
                                        image={image}
                                    />
                                </Card>
                            );
                        })
                    }
            </Carousel>
        </Paper>
        
    )
}

export default CarouselWrapper;