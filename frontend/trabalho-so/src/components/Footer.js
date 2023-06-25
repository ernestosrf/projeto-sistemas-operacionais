import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
        {/* <p>Projeto de Escalonamento e Paginação – Sistemas Operacionais</p>
        <p>Developers: Ernesto Santana, Luiz Gonzaga, Mário Sérgio e Vinícius França</p>
        <p>Este projeto executa os seguintes escalonadores: FIFO, SJF, Round Roubin e EDF</p> */}
        <p>Process Scheduling &copy; 2023</p>
    </footer>
  )
}

export default Footer