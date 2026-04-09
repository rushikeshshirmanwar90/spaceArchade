# Test Admin Integration - Step by Step

## Quick Test

1. **Start the server:**
   ```bash
   pnpm dev
   ```

2. **Test the API directly:**
   ```bash
   curl http://localhost:3000/api/hero-slides
   ```
   You should see JSON data with hero slides from the database.

3. **Login to admin:**
   - Go to: http://localhost:3000/admin
   - Password: `space_archade@23`
   - Wait for data to load from database

4. **Edit a hero slide:**
   - Click on any hero slide in the admin
   - Change the title to something like "TEST TITLE 123"
   - Click "Save Changes"
   - You should see "Changes saved successfully!" alert

5. **Verify in database:**
   ```bash
   curl http://localhost:3000/api/hero-slides
   ```
   Look for your "TEST TITLE 123" in the JSON response

6. **Check frontend:**
   - Open http://localhost:3000 in a NEW TAB or REFRESH
   - You should see "TEST TITLE 123" in the hero section

## If it's still not working:

### Check 1: Is data loading in admin?
- Open browser console (F12)
- Go to Network tab
- Refresh admin page
- Look for requests to `/api/hero-slides`, `/api/projects`, etc.
- Check if they return 200 status and have data

### Check 2: Is save request being sent?
- Keep browser console open
- Edit a hero slide
- Click Save
- Look for a PUT request to `/api/hero-slides/[id]`
- Check the response - should be `{"success":true,...}`

### Check 3: Is frontend fetching data?
- Open http://localhost:3000
- Open browser console
- Go to Network tab
- Refresh page
- Look for GET request to `/api/hero-slides`
- Check if it returns your updated data

## Common Issues:

### Issue: "Changes saved successfully" but frontend doesn't update
**Solution:** You MUST refresh the frontend page (http://localhost:3000) to see changes. The frontend only fetches data on page load.

### Issue: Admin shows old hardcoded data
**Solution:** The admin should now load from database. Check browser console for errors.

### Issue: Save button does nothing
**Solution:** Check browser console for JavaScript errors. Make sure the modal is calling the onSave function.

### Issue: API returns empty data
**Solution:** Run the seed script again:
```bash
pnpm seed
```

## Debug Commands:

```bash
# Check if hero slides exist in database
curl http://localhost:3000/api/hero-slides

# Check if projects exist
curl http://localhost:3000/api/projects

# Check if architects exist
curl http://localhost:3000/api/architects

# Test updating a hero slide (replace ID with actual ID from GET request)
curl -X PUT http://localhost:3000/api/hero-slides/[ID] \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","description":"Updated description","image":"/hero.jpg","order":1}'
```

## Expected Flow:

1. Admin loads → Fetches data from MongoDB
2. Admin edits item → Opens modal with current data
3. Admin clicks Save → Sends PUT/POST to API
4. API saves to MongoDB → Returns success
5. Admin refreshes data → Shows updated data
6. Frontend refreshes → Fetches updated data from MongoDB
7. Frontend displays → Shows new content

The key is: **Frontend must be refreshed to see changes!**
