/********************************************************************************
 * Copyright (C) 2021 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { injectable } from 'inversify';
import { Localization } from '../../common/i18n/localization';
import { LocalizationProvider } from '../../common/i18n/localization-service';

@injectable()
export class LocalizationProviderImpl implements LocalizationProvider {

    protected localizations: Localization[] = [];

    addLocalizations(...localization: Localization[]): void {
        this.localizations.push(...localization);
    }

    getAvailableLanguages(): Promise<string[]> {
        return Promise.resolve(Array.from(new Set(this.localizations.map(e => e.languageId))).sort((a, b) => a.localeCompare(b)));
    }

    loadLocalizations(languageId: string): Promise<Localization[]> {
        return Promise.resolve(this.localizations.filter(e => e.languageId === languageId));
    }

}
