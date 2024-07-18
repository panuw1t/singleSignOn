import React, { useEffect } from 'react'
import PageBg from '../../public/bgHomepage/bg.svg'
import layoutUpper from '../../public/bgHomepage/path_top.svg'
import layoutLower from '../../public/bgHomepage/Group 1000004277.svg'
import ntLogo from '../../public/NT-logo-fontLight.png'
import logoHeader from '../../public/Logo-header.svg'
import { Button, ConfigProvider, Image } from 'antd'
import { useAuth } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'

const homepageFormStyle: React.CSSProperties = {
  backgroundImage: `url(${PageBg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw',
  position: 'relative',
  zIndex: 0,
}

const layoutBgUpper: React.CSSProperties = {
  backgroundImage: `url(${layoutUpper})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top right',
  position: 'absolute',
  right: 0,
  width: '80vw',
  height: '100vh',
  zIndex: -1,
}

const layoutBgLower: React.CSSProperties = {
  backgroundImage: `url(${layoutLower})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom left',
  position: 'absolute',
  left: 0,
  width: '85vw',
  height: '100vh',
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '15px',
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
  zIndex: 100,
}

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  marginLeft: '100px',
  zIndex: 100,
}

export default function Home() {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/temp')
    }
  })

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultBg: '#FFD100',
              defaultActiveBg: '#cca700',
              defaultHoverBg: '#ffda34',
              defaultBorderColor: '#b39200',
              defaultActiveBorderColor: '#b39200',
              defaultHoverBorderColor: '#b39200',
              defaultHoverColor: '#b39200',
            },
          },
        }}
      >
        <div style={homepageFormStyle}>
          <div style={layoutBgUpper} />
          <div style={layoutBgLower} />
          <div style={containerStyle}>
            <Image src={logoHeader} width={100} alt="Logo" preview={false} />
            <div style={buttonContainerStyle}>
              <Button type="primary" className="mr-5" size="large">
                Register
              </Button>
              <Button size="large" onClick={() => auth.signinRedirect()}>
                Log in
              </Button>
            </div>
          </div>
          <div className="absolute md:top-[42%] md:right-[9%] top-[25%] right-[5%]">
            <Image src={ntLogo} width="200px" preview={false} />
            <div className="text-[40px] font-semibold text-white mt-5">
              Cloud Management Platform
            </div>
            <Button className="mt-8" size="large">
              Get Started
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  )
}
