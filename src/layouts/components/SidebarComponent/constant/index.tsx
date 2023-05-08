export const listButtonStyle = {
    borderRadius: 'var(--rounded-main)',
    mb: 0.5,
    '& .MuiTypography-root': {
        fontSize: '0.875rem'
    },
    '& .MuiListItemIcon-root': {
        minWidth: '36px',
        color: "var(--theme-text-base)"
    },
    '&:hover': {
        background: 'rgba(var(--primary-light), 0.5)',
        border: '1px solid rgba(var(--primary-light), 1)',
        color: 'rgba(var(--primary-main), 1)',
        '& .MuiListItemIcon-root': {
            color: 'rgba(var(--primary-main), 1) !important',
        }
    },
    '&.Mui-selected': {
        background: 'rgba(var(--primary-light), 0.5)',
        border: '1px solid rgba(var(--primary-light), 1)',
        color: 'rgba(var(--primary-main), 1)',
        '& .MuiListItemIcon-root': {
            color: 'rgba(var(--primary-main), 1) !important',
        },
        '&:hover': {
            background: 'rgba(var(--primary-light), 0.5)',
            border: '1px solid rgba(var(--primary-light), 1)',
            color: 'rgba(var(--primary-main), 1)',
            '& .MuiListItemIcon-root': {
                color: 'rgba(var(--primary-main), 1) !important',
            },
        }
    }
}

export const subHeaderStyle = {
    padding: 0,
    color: 'black',
    lineHeight: 'normal',
    my: 1
}

export const childListButtonStyle = {
    borderRadius: '7px',
    pl: 4,
    mb: 0.5,
    '& .MuiTypography-root': {
        fontSize: '0.875rem'
    },
    '& .MuiListItemIcon-root': {
        minWidth: '36px'
    },
    '&:hover': {
        background: 'none',
        color: 'rgba(var(--primary-main), 1) !important',
        '& .MuiListItemIcon-root': {
            color: 'rgba(var(--primary-main), 1) !important',
        }
    },
    '&.Mui-selected': {
        background: 'none',
        color: 'rgba(var(--primary-main), 1)',
        '&:hover': {
            background: 'none',
        },
        '& .MuiListItemIcon-root': {
            color: 'rgba(var(--primary-main), 1) !important',
        }
    }
}
