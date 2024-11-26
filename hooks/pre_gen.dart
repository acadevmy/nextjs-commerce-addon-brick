import 'dart:io';
import 'package:mason/mason.dart';

void run(HookContext context) async {
  await moveAppToAppLocale(context: context);
}

Future<void> moveAppToAppLocale({
  required HookContext context,
}) async {
  context.logger.info('📦 Move src/app to src/app/[locale] folder');
  final appPath = 'src/app';

  // 1. create new folder src/app/[locale]
  final localePath = '$appPath/[locale]';
  Directory(localePath).createSync(recursive: true);

  // 2. move existing files from src/app to src/app/[locale]
  final sourceDir = Directory(appPath);
  if (sourceDir.existsSync()) {
    sourceDir.listSync().whereType<Directory>().forEach((dir) {
      final containsRelevantFile = dir.listSync().any((file) {
        final fileName = file.uri.pathSegments.last;
        return fileName == 'page.tsx' || fileName == 'route.ts';
      });

      if (containsRelevantFile) {
        // move folder
        final newPath = dir.path.replaceFirst(appPath, localePath);
        Directory(newPath).createSync(recursive: true);
        dir.renameSync(newPath);
      }
    });
  }
  context.logger.success('📦 src/app moved to src/app/[locale] 🚀');
}
