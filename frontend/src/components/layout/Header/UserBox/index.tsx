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
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';

import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PersonIcon from '@mui/icons-material/Person';
import { ThemeSwitch } from '@components/layout/Toggle';
import { useTheme } from '@hooks/useTheme';

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
				{/* <Avatar variant='rounded' alt={Lucas} src={user.photoUrl} /> */}
				<Hidden mdDown>
					<UserBoxText>
						<UserBoxLabel variant='body1'>Olá</UserBoxLabel>
						<UserBoxDescription variant='body2'>Se Organize</UserBoxDescription>
					</UserBoxText>
				</Hidden>
				<Hidden smDown>
					<ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
				</Hidden>
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
						<UserBoxLabel variant='body1'>Olá</UserBoxLabel>
						<UserBoxDescription variant='body2'>Se Organize</UserBoxDescription>
					</UserBoxText>
				</MenuUserBox>
				<Divider sx={{ mb: 0 }} />
				<List sx={{ p: 1 }} component='nav'>
					<ListItem button to='/' component={NavLink}>
						<AccountBoxTwoToneIcon fontSize='small' />
						<ListItemText primary='Início' />
					</ListItem>
					<ListItem button to='/task' component={NavLink}>
						<ContactPhoneIcon fontSize='small' />
						<ListItemText primary='Nova Tarefa' />
					</ListItem>
					<ListItem button to='/qrcode' component={NavLink}>
						<PersonIcon fontSize='small' />
						<ListItemText primary='Sincronizar Celular' />
					</ListItem>
				</List>
				<Divider />
				<Box display='flex' alignItems='center' justifyContent='center'>
					<ThemeSwitch checked={darkTheme} onChange={handleChangeTheme} />
				</Box>
			</Popover>
		</>
	);
};
