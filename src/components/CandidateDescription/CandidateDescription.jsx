import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import Photo from './../../assets/images/photo.png'

export const CandidateDescription = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/statistics')
    };

    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '0 -50% 0 0',
            transform: 'translate(-50%, -50%)'
        }}>
            <Card sx={{maxWidth: 600}}>
                <CardMedia
                    sx={{
                        margin: '15px auto 0',
                        height: 300,
                        width: 300
                    }}
                    image={Photo}
                    title='photo'
                />
                <CardContent>
                    <Typography sx={{
                        textAlign: 'center'
                    }} gutterBottom variant='h5' component='div'>
                        Kristina Filchenko
                    </Typography>
                    <Typography color='text.secondary'>
                        My name is Christina, I'm 25, I am a developer, but it wasn't always like that.
                        At school, I dreamed of a profession that would give me pleasure, be interesting and benefit
                        other people, that's why I decided to become a lawyer. I graduated from the university with honors,
                        but when I started working, I realized that the expectation and reality didn't match. I've chosen programming because
                        it is a perfect opportunity for constant self-development and it is very important for me that the profession is
                        interesting and not boring. A large amount of information in this area is a plus for me.
                        Secondly, IT is the most relevant and rapidly developing area in the modern world, which benefits many people.
                        I chose frontend direction, made a training plan and got to work. The longer I studied, the more I realized that
                        I made the right choice.

                        In my free time from work I study English and Turkish languages, try to read work-related literature and do some sport.
                        In free time I also spend time with family and friends.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' onClick={handleClick}>Statistics</Button>
                </CardActions>
            </Card>
        </Box>
    )
};