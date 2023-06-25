// CSS
import styles from './Home.module.css';

import Processos from '../../components/Processos';

const Home = () => {
  return (
    <div className={styles.containerHome}>
        <div className={styles.titleWrapperHome}>
            <h1>Insira a quantidade de processos e defina seus dados antes de selecionar o método de escalonamento.</h1>
        </div>
        <Processos/>
    </div>
  )
}

export default Home