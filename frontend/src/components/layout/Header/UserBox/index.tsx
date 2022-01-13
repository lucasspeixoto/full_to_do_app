import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
	Box,
	Button,
	Divider,
	Hidden,
	lighten,
	List,
	ListItem,
	ListItemText,
	Popover,
	Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';

import KingBedIcon from '@mui/icons-material/KingBed'; //! Hora de Dormir
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'; //! Bom dia
import Brightness4Icon from '@mui/icons-material/Brightness4'; //! Boa Tarde
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded'; //! Boa noite

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import { ThemeSwitch } from '@components/layout/Toggle';
import { useTheme } from '@hooks/useTheme';
import { getGreeting } from '@core/helpers/CommonHelpers';

const greetings = {
	0: <KingBedIcon fontSize='medium' />,
	1: <WbSunnyRoundedIcon fontSize='medium' />,
	2: <Brightness4Icon fontSize='medium' />,
	3: <NightsStayRoundedIcon fontSize='medium' />,
};

const UserBoxButton = styled(Button)(
	({ theme }) => `
		padding-left: ${theme.spacing(1)};
		padding-right: ${theme.spacing(1)};
`,
);

const MenuUserBox = styled(Box)(
	({ theme }) => `
		background: ${theme.colors.alpha.black[5]};
		padding: ${theme.spacing(2)};
`,
);

const UserBoxText = styled(Box)(
	({ theme }) => `
		text-align: left;
		padding-left: ${theme.spacing(1)};
`,
);

const UserBoxLabel = styled(Typography)(
	({ theme }) => `
		font-weight: ${theme.typography.fontWeightBold};
		color: ${theme.palette.secondary.main};
		display: block;
`,
);

const UserBoxDescription = styled(Typography)(
	({ theme }) => `
		color: ${lighten(theme.palette.secondary.main, 0.5)}
`,
);

export const HeaderUserbox = () => {
	const { message, type } = getGreeting();
	const { themeName, setThemeName } = useTheme();
	const [darkTheme, setDarkTheme] = useState(() =>
		themeName === 'NebulaFighterTheme' ? true : false,
	);
	const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDarkTheme(event.target.checked);
		if (darkTheme) {
			setThemeName('PureLightTheme');
		} else {
			setThemeName('NebulaFighterTheme');
		}
	};

	const ref = useRef<any>(null);
	const [isOpen, setOpen] = useState<boolean>(false);

	const handleOpen = (): void => {
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
	};

	return (
		<>
			<UserBoxButton color='secondary' ref={ref} onClick={handleOpen}>
				<Hidden mdUp>
					<MenuTwoToneIcon />
				</Hidden>
				<Hidden mdDown>
					<UserBoxText>
						<UserBoxLabel variant='body1'>
							<Box
								display='flex'
								alignItems='center'
								justifyContent='center'
								sx={{ p: 0, gap: 1 }}
							>
								<Typography sx={{ pl: 0 }} variant='h4'>
									{message}{' '}
								</Typography>
								{greetings[type]}
							</Box>
						</UserBoxLabel>
						<UserBoxDescription variant='body2'>
							Finalize suas Tarefas
						</UserBoxDescription>
					</UserBoxText>
				</Hidden>
				{/* <Hidden smUp>
					<MenuTwoToneIcon sx={{ ml: 1 }} />
				</Hidden> */}
			</UserBoxButton>
			<Popover
				anchorEl={ref.current}
				onClose={handleClose}
				open={isOpen}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<MenuUserBox sx={{ minWidth: 210 }} display='flex'>
					<UserBoxText>
						<UserBoxLabel variant='body1'>{message}</UserBoxLabel>
						<UserBoxDescription variant='body2'>
							Não deixe de finalizar as suas tarefas.
						</UserBoxDescription>
					</UserBoxText>
				</MenuUserBox>
				<Divider sx={{ mb: 0 }} />
				<List sx={{ p: 1 }} component='nav'>
					<ListItem button to='/' component={NavLink}>
						<HomeIcon fontSize='small' />
						<ListItemText primary='Início' />
					</ListItem>
					<ListItem button to='/task' component={NavLink}>
						<AddBoxIcon fontSize='small' />
						<ListItemText primary='Nova Tarefa' />
					</ListItem>
					<ListItem button to='/qrcode' component={NavLink}>
						<QrCode2Icon fontSize='small' />
						<ListItemText primary='Sincronizar Celular' />
					</ListItem>
				</List>
				<Divider />
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					sx={{ gap: 1 }}
				>
					<Typography variant='h3'>Tema</Typography>
					<ThemeSwitch checked={darkTheme} onChange={handleChangeTheme} />
				</Box>
			</Popover>
		</>
	);
};
