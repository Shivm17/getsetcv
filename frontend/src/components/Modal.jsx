import React from 'react'
import { modalStyles as styles } from './landingPageStyle'
import { X } from 'lucide-react'

const Model = ({children,isOpen,onClose,title,hideHeader}) => {
    
    if (!isOpen) return null; // <-- Add this line

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
          {!hideHeader && (
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
            </div>   
          )}
          <button type='button' className={styles.closeButton}
          onClick={onClose}
          ><X size={20} /></button>
          <div className={styles.body}>{children}</div>
      </div>
      
    </div>
  )
}

export default Model
