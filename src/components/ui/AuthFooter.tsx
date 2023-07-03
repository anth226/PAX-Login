import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

function AuthFooter() {
    const [language, setLanguage] = React.useState('English');

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
            <MenuItem value='Nepali'>Nepali</MenuItem>
            <MenuItem value='Hindi'>Hindi</MenuItem>
            <MenuItem value='English'>English</MenuItem>
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