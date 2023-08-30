import './footer.css'
import awsLogo from '/aws.svg'
import dockerLogo from '/docker.png'

export default function Footer() {
return <div>
      <div className='prov-footer'>
      <p className="read-the-docs">
        Click on the Docker and AWS logos to learn more about our tech stack
      </p>
          <a href="https://www.docker.com/" target="_blank">
            <img src={dockerLogo} className="logo" alt="docker logo" />
          </a>
          <a href="https://www.hetzner.com/" target="_blank">
            <img src={awsLogo} className="logo aws" alt="aws logo" />
          </a>
        </div>
</div>
}