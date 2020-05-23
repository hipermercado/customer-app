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
    "https://24by7.store/wp-content/uploads/2020/04/grocery_banner.jpg",
    "https://mobisoftinfotech.com/resources/wp-content/uploads/2018/11/Future.png"
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
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                customTransition="all .5"
                transitionDuration={500}
                removeArrowOnDeviceType={["mobile"]}
                deviceType={"mobile"}
                >
                    {
                        images.map(image => {
                            return (
                                <Card className={classes.card}>
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