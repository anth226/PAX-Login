import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import i18nConfig from '../../../i18n.json'

function AuthFooter() {
  const {lang} = useTranslation()
    const [language, setLanguage] = React.useState(lang);

    const {languages} = i18nConfig

    const handleChange = (event) => {
      setLanguage(event.target.value as string);
    };
  
  return (
    <div className='flex justify-between items-center text-primary dark:text-dark text-sm mt-4'>
        <div>
            
        <FormControl fullWidth className='text-primary  dark:text-dark text-xs language-select '>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            disableUnderline={true}
            onChange={handleChange}
            className='text-xs dark:text-[#ddd]'
          >
            {languages?.map(lan=>{
              return(
                <MenuItem key={lan.value} value={lan.value}>{lan.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        </div>
        <div className='flex items-center gap-8 text-xs'>
            <div>Help</div>
            <div>Privacy</div>
            <div>Terms</div>
        </div>
    </div>
  )
}

export default AuthFooter