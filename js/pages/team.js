import { initShell } from '../app.js';
import { teamGridHtml } from '../render/team.js';

function renderTeam() {
  document.getElementById('team-grid').innerHTML = teamGridHtml();
}

await initShell({ topbarClass: 'energy-topbar' });
renderTeam();
