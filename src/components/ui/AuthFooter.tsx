import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
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
    <div className='flex justify-between items-center text-[#202124] text-sm mt-4'>
        <div>
            
        <FormControl fullWidth className='text-[#202124] text-xs '>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            disableUnderline={true}
            onChange={handleChange}
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